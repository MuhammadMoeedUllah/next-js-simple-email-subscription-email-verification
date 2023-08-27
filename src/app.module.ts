import { Module } from '@nestjs/common';
// import { SubscriptionController } from './subscription/subscription.controller';
// import { SubscriptionService } from './subscription/subscription.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionModule } from './subscription/subscription.module';
import * as dbConfigs from './database/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...dbConfigs[process.env.NODE_ENV],
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env'
          : `.env.${process.env.NODE_ENV}`,
    }),
    SubscriptionModule,
  ],
})
export class AppModule {}
