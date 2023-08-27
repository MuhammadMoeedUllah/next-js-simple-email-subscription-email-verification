import { IsNotEmpty, MinLength } from 'class-validator';

export class VerifyEmailConfirmationDto {
  @IsNotEmpty()
  @MinLength(10)
  token: string;
}
