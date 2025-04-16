// dto 공통 검증 로직

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/** DTO 유효성 검증 도우미 */
export const validateDto = async <T extends object>(
  dtoClass: new () => T,
  data: object,
) => {
  const dto = plainToInstance(dtoClass, data);
  const errors = await validate(dto);
  return { dto, errors };
};
