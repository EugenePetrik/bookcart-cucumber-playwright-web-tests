import { type Page, expect } from '@playwright/test';
import baseConfig from '../config/baseConfig';

export abstract class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class Component extends PageHolder {
  abstract expectLoaded(message?: string): Promise<void>;

  async isLoaded(): Promise<boolean> {
    try {
      await this.expectLoaded();
      return true;
    } catch {
      return false;
    }
  }
}

export abstract class AppPage extends Component {
  /**
   * Path to the page can be relative to the baseUrl defined in playwright.config.ts
   * or absolute (on your own risk)
   */
  public abstract pagePath: string;

  /**
   * Opens the page in the browser and expectLoaded should pass
   */
  async open(path?: string): Promise<void> {
    await this.page.goto(`${baseConfig.BASE_URL}${path ?? this.pagePath}`);
    await this.expectLoaded();
  }

  async expectNotification(message: string) {
    await expect(this.page.getByRole('heading', { level: 4 })).toHaveText(message);
  }
}
