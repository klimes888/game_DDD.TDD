import { faker } from '@faker-js/faker/.';
import { user_email } from './user.fixture';

export const correct_login_user = {
  email: user_email,
  password: faker.internet.password(),
};

export const wrong_login_user = {
  email: user_email,
  password: 'wrong password',
};
