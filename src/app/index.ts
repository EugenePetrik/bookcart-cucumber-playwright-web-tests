import { PageHolder } from './abstract.classes';
import { SearchPage } from './page/search.page';
import { HomePage } from './page/home.page';
import { LoginPage } from './page/login.page';
import { RegisterPage } from './page/register.page';

export class Application extends PageHolder {
  public readonly homePage: HomePage = new HomePage(this.page);

  public readonly registerPage: RegisterPage = new RegisterPage(this.page);

  public readonly loginPage: LoginPage = new LoginPage(this.page);

  public readonly searchPage: SearchPage = new SearchPage(this.page);
}
