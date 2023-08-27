import { JwtService } from '@nestjs/jwt';
import { IVerificationTokenPayload } from './interfaces/verificationTokenPayload.interface';
import { BadRequestException } from '@nestjs/common';
export class EmailVerification {
  JWT_VERIFICATION_TOKEN_SECRET: string;
  JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: string;
  jwtService: JwtService;
  constructor(
    JWT_VERIFICATION_TOKEN_SECRET: string,
    JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: string,
  ) {
    this.JWT_VERIFICATION_TOKEN_SECRET = JWT_VERIFICATION_TOKEN_SECRET;
    this.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME =
      JWT_VERIFICATION_TOKEN_EXPIRATION_TIME;
    this.jwtService = new JwtService();
  }
  public encodeConfirmationToken(payload: IVerificationTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: this.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
    });
  }
  public verifyConfirmationToken(token: string): IVerificationTokenPayload {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.JWT_VERIFICATION_TOKEN_SECRET,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return { email: payload.email };
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
