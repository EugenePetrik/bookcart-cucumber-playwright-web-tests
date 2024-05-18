import { expect } from '@playwright/test';
import baseConfig from '../../config/baseConfig';
import { AppPage } from '../abstract.classes';
import { RegisterUser } from '../../helper/types/user';

export class RegisterPage extends AppPage {
  public readonly pagePath: string = '/register';

  private readonly firstNameInput = this.page.getByPlaceholder('First name');

  private readonly lastNameInput = this.page.getByPlaceholder('Last name');

  private readonly userNameInput = this.page.getByPlaceholder('User name');

  private readonly passwordInput = this.page.locator('[formcontrolname="password"]');

  private readonly confirmPasswordInput = this.page.locator(
    '[formcontrolname="confirmPassword"]',
  );

  private readonly maleRadio = this.page.locator('input[value="Male"]');

  private readonly femaleRadio = this.page.locator('input[value="Female"]');

  private readonly registerButton = this.page.getByRole('button', { name: 'Register' });

  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.firstNameInput).toBeVisible(),
      await expect(this.lastNameInput).toBeVisible(),
      await expect(this.userNameInput).toBeVisible(),
      await expect(this.passwordInput).toBeVisible(),
      await expect(this.confirmPasswordInput).toBeVisible(),
      await expect(this.maleRadio).toBeVisible(),
      await expect(this.femaleRadio).toBeVisible(),
      await expect(this.registerButton).toBeVisible(),
    ]);
  }

  async registerUser(user: RegisterUser) {
    const { firstName, lastName, userName, password, confirmPassword, gender } = user;

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    // This must be unique always
    await this.enterUsername(userName);

    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);

    if (gender === 'Male') {
      await this.maleRadio.click();
      await expect(this.maleRadio).toBeChecked();
    } else {
      await this.femaleRadio.click();
      await expect(this.femaleRadio).toBeChecked();
    }

    await this.registerButton.click();
  }

  private async enterUsername(username: string) {
    await this.userNameInput.fill(username);

    const [response] = await Promise.all([
      this.page.waitForResponse(res => {
        return (
          res.status() === 200 &&
          res.url() === `${baseConfig.BASE_URL}/api/user/validateUserName/${username}`
        );
      }),
    ]);

    await response.finished();
  }
}
