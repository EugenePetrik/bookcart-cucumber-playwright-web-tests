import { expect } from '@playwright/test';
import { Component } from '../abstract.classes';

export class Header extends Component {
  private readonly searchInput = this.page.getByPlaceholder('Search books or authors');

  private readonly cartButton = this.page.locator(
    'button[ng-reflect-router-link="/shopping-cart"]',
  );

  private readonly cartValue = this.page.locator('[id^=mat-badge-content]').last();

  private readonly userMenu = this.page.locator('mat-toolbar .mdc-button__label').nth(1);

  private readonly loginLink = this.page.getByRole('button', { name: 'Login' });

  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.searchInput).toBeVisible(),
      await expect(this.cartButton).toBeVisible(),
    ]);
  }

  async selectBook(name: string) {
    await this.searchInput.fill(name);
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(2000);
    await this.page.locator('mat-option .mdc-list-item__primary-text').click();
  }

  async clickOnCart() {
    await this.cartButton.click();
  }

  async expectCartValueUpdated() {
    const badgeCount = await this.cartValue.innerText();
    expect(Number(badgeCount)).toBeGreaterThan(0);
  }

  async clickOnUserMenu() {
    await this.userMenu.click();
  }

  async expectLoginSuccess(username: string) {
    await expect(this.userMenu).toHaveText(username);
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }
}
