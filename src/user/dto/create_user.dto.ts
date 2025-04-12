import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 6자리 이상이어야 합니다.' })
  password: string;

  @IsNotEmpty({ message: '프로필 이름은 필수입니다.' })
  profileName: string;
}
