import { PageHolder } from './abstract.classes';
import { BooksPage } from './page/books.page';
import { HomePage } from './page/home.page';
import { LoginPage } from './page/login.page';
import { RegisterPage } from './page/register.page';

export class Application extends PageHolder {
  public readonly home: HomePage = new HomePage(this.page);

  public readonly register: RegisterPage = new RegisterPage(this.page);

  public readonly login: LoginPage = new LoginPage(this.page);

  public readonly books: BooksPage = new BooksPage(this.page);
}
