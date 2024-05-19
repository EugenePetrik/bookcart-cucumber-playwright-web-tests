import { expect } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import { Header } from '../component/header.component';

export class HomePage extends AppPage {
  public readonly pagePath = '/';

  public readonly header = new Header(this.page);

  private readonly bookCard = this.page.locator('mat-card.book-card');

  async expectLoaded(): Promise<void> {
    await expect(this.bookCard).not.toHaveCount(0);
  }
}
