import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
