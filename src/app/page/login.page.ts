import { expect } from '@playwright/test';
import { AppPage } from '../abstract.classes';
import baseConfig from '../../config/baseConfig';

export class LoginPage extends AppPage {
  public readonly pagePath: string = '/login';

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

  async enterUserName(username: string) {
    await this.userNameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    const responsePromise = this.page.waitForResponse(`${baseConfig.BASE_URL}/**`);
    await this.loginButton.click();
    await responsePromise;
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async loginUser(user: string, password: string) {
    await this.enterUserName(user);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
