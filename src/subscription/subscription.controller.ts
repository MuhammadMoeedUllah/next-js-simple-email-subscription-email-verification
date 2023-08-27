import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscriptions } from './subscription.model';
import { Request } from 'express';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { VerifyEmailConfirmationDto } from './dto/verify-email.dto';
import { ParseIntPipe } from '@nestjs/common';
@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('subscription/:id')
  getSubscription(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Subscriptions> {
    return this.subscriptionService.findOne(id);
  }
  @Get('subscription')
  getAllSubscriptions(): Promise<Subscriptions[]> {
    return this.subscriptionService.findAll();
  }
  @Post('subscription')
  createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscriptions> {
    return this.subscriptionService.create(createSubscriptionDto);
  }
  @Post('subscription/verify')
  verifyEmailConfirmation(
    @Body() verifyEmailConfirmationDto: VerifyEmailConfirmationDto,
  ): Promise<Subscriptions> {
    return this.subscriptionService.verifyEmailConfirmation(
      verifyEmailConfirmationDto.token,
    );
  }
}
