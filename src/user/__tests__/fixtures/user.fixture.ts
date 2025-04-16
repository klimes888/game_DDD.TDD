import { faker } from '@faker-js/faker/.';

export const user_email = faker.internet.email();

export const correct_user_data = {
  email: user_email,
  password: faker.internet.password(),
  profileName: faker.person.lastName(),
};

export const found_user_data = {
  ...correct_user_data,
  id: 1,
};

export const wrong_user_datas = [
  {
    email: '',
    password: faker.internet.password(),
    profileName: 'John',
    reason: 'empty email',
  },
  {
    email: 'invalid-email',
    password: faker.internet.password(),
    profileName: 'Jane',
    reason: 'invalid email format',
  },
  {
    email: faker.internet.email(),
    password: '',
    profileName: 'EmptyPass',
    reason: 'empty password',
  },
  {
    email: faker.internet.email(),
    password: 'short',
    profileName: '',
    reason: 'empty profile name',
  },
];

export const wrong_user_ids = ['1', '', 'a', 0.1, null, undefined];

export const modify_user_data = {
  id: 1,
  email: faker.internet.email(),
  profileName: faker.person.lastName(),
  password: faker.internet.password(),
};

export const wrong_modify_user_data = [
  {
    id: null,
    email: faker.internet.email(),
    profileName: faker.person.lastName(),
    password: faker.internet.password(),
    reason: 'id is null',
  },
  {
    id: 1,
    email: faker.internet.email(),
    profileName: '너무긴닉네임너무긴닉네임너무긴닉네임너무긴닉네임',
    password: faker.internet.password(),
    reason: 'nickname is too long',
  },
  {
    id: 1,
    email: faker.internet.email(),
    profileName: '짧',
    password: faker.internet.password(),
    reason: 'nickname is too short',
  },
  {
    id: 1,
    email: '',
    profileName: 'testtest', // 6자리
    password: faker.internet.password(),
    reason: 'email is null',
  },
];
