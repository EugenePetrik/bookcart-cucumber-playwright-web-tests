import { expect } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import baseConfig from '../../config/baseConfig';

export class LoginPage extends AppPage {
  public readonly pagePath = '/login';

  private readonly userNameInput = this.page.getByPlaceholder('Username');

  private readonly passwordInput = this.page.getByPlaceholder('Password');

  private readonly loginButton = this.page
    .locator('mat-card')
    .getByRole('button', { name: 'Login' });

  private readonly errorMessage = this.page.locator('mat-error');

  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.userNameInput).toBeVisible(),
      await expect(this.passwordInput).toBeVisible(),
      await expect(this.loginButton).toBeVisible(),
    ]);
  }

  async enterUsername(text: string): Promise<void> {
    await this.userNameInput.fill(text);
  }

  async enterPassword(text: string): Promise<void> {
    await this.passwordInput.fill(text);
  }

  async clickLoginButton(): Promise<void> {
    const responsePromise = this.page.waitForResponse(`${baseConfig.BASE_URL}/api/login`);
    await this.loginButton.click();
    await responsePromise;
  }

  async expectErrorMessage(text: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(text);
  }

  async loginUser(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
