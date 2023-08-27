import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  active: boolean;

  @IsNotEmpty()
  frequency: number;

  @IsNotEmpty()
  emailVerified: boolean;

  @IsNotEmpty()
  @MinLength(4)
  country: string;
}
