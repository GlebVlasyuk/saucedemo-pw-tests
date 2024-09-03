import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutCompletePage extends BasePage {
    readonly page: Page;
    readonly pageContainer: Locator;
    readonly successIcon: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageContainer = this.page.getByTestId("checkout-complete-container");
        this.successIcon = this.pageContainer.getByTestId("pony-express");
        this.completeHeader = this.pageContainer.getByTestId("complete-header");
        this.completeText = this.pageContainer.getByTestId("complete-text");
        this.backHomeButton = this.pageContainer.getByTestId("back-to-products");
    }

    async open(): Promise<void> {
        await this.page.goto("/checkout-complete.html");
        await this.page.waitForURL("/");
      }
    
      async expectPageToBeDisplayed(): Promise<void> {
        await expect(
          this.pageContainer,
          "Checkout Complete page container should be visible"
        ).toBeVisible();
        await expect(this.successIcon, 'Success icon should be visible').toBeVisible();
        await expect(this.completeHeader, 'Complete header should have correct text').toHaveText('Thank you for your order!');
        await expect(this.completeText, 'Complete text label should have correct text').toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(this.backHomeButton, 'Back to products button icon should be visible').toBeVisible();
        await expect(this.backHomeButton, 'Back to products button icon should be enabled').toBeEnabled();
        await expect.soft(this.backHomeButton, 'Back to products button should have correct text').toHaveText('Back Home');
        await expect.soft(this.backHomeButton, 'Back to products button should be colored green').toHaveCSS('background-color', 'rgb(61, 220, 145)');
      }

      async clickOnBackHomeButton(): Promise<void> {
        await this.backHomeButton.click();
      }
    
}