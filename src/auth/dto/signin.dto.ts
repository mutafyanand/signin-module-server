import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/[a-zA-Z]/, {
    message: 'Password must contain at least 1 letter',
  })
  @Matches(/\d/, {
    message: 'Password must contain at least 1 number',
  })
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, {
    message: 'Password must contain at least 1 special character',
  })
  password: string;
}
