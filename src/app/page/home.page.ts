import { AppPage } from '../abstract.classes';
import { Header } from '../component/header.component';

export class HomePage extends AppPage {
  public readonly pagePath: string = '/';

  public readonly header: Header = new Header(this.page);

  async expectLoaded(): Promise<void> {
    await this.header.expectLoaded();
  }
}
