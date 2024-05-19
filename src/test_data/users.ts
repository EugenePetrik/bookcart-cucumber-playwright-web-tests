interface IUser {
  username: string;
  password: string;
}

export interface IUsersConfig {
  admin_user: IUser;
  lead_user: IUser;
  invalid_user: IUser;
}

const users: IUsersConfig = {
  admin_user: {
    username: process.env.ADMIN_USERNAME || 'user_name_first',
    password: process.env.PASSWORD || 'Qwerty123',
  },
  lead_user: {
    username: process.env.LEAD_USERNAME || 'user_name_second',
    password: process.env.PASSWORD || 'Qwerty123',
  },
  invalid_user: {
    username: process.env.ADMIN_USERNAME || 'koushik',
    password: process.env.PASSWORD || 'Passkoushik',
  },
};

export default users;
