import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions } from './subscription.model';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { sendEmail } from '../commons/email';
import { ConfigService } from '@nestjs/config';
import { EmailVerification } from '../commons/tokenVerification';
@Injectable()
export class SubscriptionService {
  private EmailVerificationModule: EmailVerification;
  constructor(
    @InjectModel(Subscriptions)
    private subscriptionModel: typeof Subscriptions,
    private readonly configService: ConfigService,
  ) {
    this.EmailVerificationModule = new EmailVerification(
      this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'),
    );
  }

  async findAll(): Promise<Subscriptions[]> {
    return this.subscriptionModel.findAll();
  }

  async findOne(id: number): Promise<Subscriptions> {
    return this.subscriptionModel.findOne({
      where: {
        id,
      },
    });
  }
  public async SendEmail(email: string, url: string): Promise<boolean> {
    try {
      await sendEmail(email, url);
      return true;
    } catch (error) {
      return false;
    }
  }
  public generateToken(email: string): string {
    const token = this.EmailVerificationModule.encodeConfirmationToken({
      email,
    });
    return token;
  }
  async create(subscription: CreateSubscriptionDto): Promise<Subscriptions> {
    const findIfAlreadyExists = await this.subscriptionModel.findOne({
      where: { email: subscription.email },
    });
    if (findIfAlreadyExists) {
      return findIfAlreadyExists;
    }

    await this.SendEmail(
      subscription.email,
      this.configService.get('EMAIL_CONFIRMATION_URL') +
        '/' +
        this.generateToken(subscription.email),
    );
    return this.subscriptionModel.create({
      name: subscription.name,
      email: subscription.email,
      active: subscription.active,
      frequency: subscription.frequency,
      country: subscription.country,
    });
  }
  async verifyEmailConfirmation(token: string): Promise<Subscriptions> {
    const verifier = new EmailVerification(
      this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'),
    );
    const payload = verifier.verifyConfirmationToken(token);
    const subscribedItem = await this.subscriptionModel.findOne({
      where: { email: payload.email },
    });
    if (!subscribedItem) {
      throw new BadRequestException('Email not found');
    }
    subscribedItem.emailVerified = true;
    return subscribedItem.save();
  }
}
