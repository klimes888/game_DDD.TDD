import { IsEmail, IsInt, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: '유효한 이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  @MinLength(8, { message: '비밀번호는 최소 6자리 이상이어야 합니다.' })
  password: string;

  @IsNotEmpty({ message: '프로필 이름은 필수입니다.' })
  profileName: string;
}

export class GetUserDto {
  @IsNotEmpty({ message: 'user id는 필수입니다.' })
  @IsInt({ message: 'user id는 정수여야 합니다.' })
  @Min(1, { message: 'user id는 1 이상이어야 합니다.' })
  id: number;
}
