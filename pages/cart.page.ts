import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { InventoryItem } from "../components/inventory-item.component";

export class CartPage extends BasePage {
    readonly page: Page;
    readonly pageContainer: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartQuantityLabel: Locator;
    readonly cartDescriptionLabel: Locator;
    readonly cartListContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageContainer = this.page.getByTestId("cart-contents-container");
        this.cartQuantityLabel = this.pageContainer.getByTestId("cart-quantity-label");
        this.cartDescriptionLabel = this.pageContainer.getByTestId("cart-desc-label");
        this.continueShoppingButton = this.pageContainer.getByTestId("continue-shopping");
        this.checkoutButton = this.pageContainer.getByTestId("checkout");
        this.cartListContainer = this.page.getByTestId("cart-list");
    }

    async open(): Promise<void> {
      const urlPath = "/cart.html";
        await this.page.goto(urlPath);
        await this.page.waitForURL(urlPath);
      }
    
      async expectPageToBeDisplayed(): Promise<void> {
        await expect(
          this.pageContainer,
          "Cart page container should be visible"
        ).toBeVisible();
      }

      getItemCardByIndexInList(itemIndex: number): InventoryItem {
        return new InventoryItem(this.page, itemIndex);
      }

      async clickOnCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
      }

      async expectCheckoutButtonIsDisplayedAndEnabled(): Promise<void> {
        await expect(this.checkoutButton, 'Checkout button should be visible').toBeVisible();
        await expect(this.checkoutButton, 'Checkout button should be enabled').toBeEnabled();
      }

      async expectContinueShoppingButtonIsDisplayedAndEnabled(): Promise<void> {
        await expect(this.continueShoppingButton, 'Continue shopping button should be visible').toBeVisible();
        await expect(this.continueShoppingButton, 'Continue shopping button should be enabled').toBeEnabled();
      }

}