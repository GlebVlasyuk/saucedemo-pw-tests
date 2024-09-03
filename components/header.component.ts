import { expect, Locator, Page } from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly headerContainer: Locator;
    readonly openMenuButton: Locator;
    readonly appLogo: Locator;
    readonly shoppingCartButton: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerContainer = this.page.getByTestId('primary-header');
        this.openMenuButton = this.headerContainer.locator('#react-burger-menu-btn')
        this.appLogo = this.headerContainer.locator('.app_logo');
        this.shoppingCartButton = this.headerContainer.getByTestId('shopping-cart-link');
        this.shoppingCartBadge = this.headerContainer.getByTestId('shopping-cart-badge');
    }

    async clickOnOpenMenuButton(): Promise<void> {
        await this.openMenuButton.click();
    }

    async clickOnShoppingCartButton(): Promise<void> {
        await this.shoppingCartButton.click();
    }

    async expectHeaderDisplayedCorrectly(): Promise<void> {
        await expect(this.headerContainer, 'Header should be displayed').toBeVisible();
        await expect(this.openMenuButton, 'Open menu button should be displayed').toBeVisible();
        await expect(this.openMenuButton, 'Open menu button should be enabled').toBeEnabled();
        await expect(this.appLogo, 'App logo should have correct text').toHaveText('Swag Labs');
        await expect(this.shoppingCartButton, 'Shopping cart link should be displayed').toBeVisible();
        await expect(this.shoppingCartButton, 'Shopping cart link should be enabled').toBeEnabled();
    }

    async expectShoppingCartBadgeToBeCorrectlyDisplayed(expectedItemsInCart: number): Promise<void> {
        await expect(this.shoppingCartBadge, 'Shopping cart badge should be displayed').toBeVisible();
        await expect(this.shoppingCartBadge, 'Shopping cart badge should have correct items count').toHaveText(expectedItemsInCart.toString());
    }

    async expectShoppingCartBadgeToNotBeDisplayed(): Promise<void> {
        await expect(this.shoppingCartBadge, 'Shopping cart badge should not be displayed').toBeHidden();
    }
}