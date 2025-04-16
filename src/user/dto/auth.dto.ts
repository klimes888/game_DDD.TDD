import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// 중복 제거
export class UserLoginDto {
  @IsNotEmpty({ message: '이메일은 필수 입니다.' })
  @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자리 이상이어야 합니다.' })
  password: string;
}
