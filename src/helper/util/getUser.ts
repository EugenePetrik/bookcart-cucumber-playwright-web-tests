import users, { type IUsersConfig } from '../../test_data/users';
import contextManager from '../context/contextManager';

export function getUser(user: keyof IUsersConfig): [string, string] {
  const { username, password } = users[user];

  contextManager.set('username', username);
  contextManager.set('password', password);

  return [username, password];
}
