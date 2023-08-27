import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscriptions } from './subscription.model';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [SequelizeModule.forFeature([Subscriptions])],
  providers: [SubscriptionService],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
