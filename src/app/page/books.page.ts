import { expect } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import { Header } from '../component/header.component';
import baseConfig from '../../config/baseConfig';

export class BooksPage extends AppPage {
  public readonly pagePath: string = '/';

  public readonly header: Header = new Header(this.page);

  private readonly categories = this.page.locator('app-book-filter a');

  private readonly addToCartButton = this.page.getByRole('button', {
    name: 'Add to Cart',
  });

  private readonly bookTitle = this.page.locator('div.card-title');

  private readonly toast = this.page.locator('simple-snack-bar');

  async expectLoaded(): Promise<void> {
    await Promise.all([await expect(this.addToCartButton).toBeVisible()]);
  }

  async verifyAllCategories(categories: string[]) {
    await expect(this.categories).toHaveText(categories);
  }

  async addBookToCart(bookName: string) {
    await expect(this.bookTitle).toHaveText(bookName, { ignoreCase: true });

    const responsePromise = this.page.waitForResponse(`${baseConfig.BASE_URL}/**`);
    await this.addToCartButton.click();
    await responsePromise;

    await expect(this.toast).toBeVisible({ timeout: 3_000 });
    await expect(this.toast).toHaveText('One Item added to cart');
    await expect(this.toast).not.toBeVisible({ timeout: 3_000 });
  }
}
