import { expect, Locator, Page } from "@playwright/test";

export class InventoryItem {
    readonly page: Page;
    readonly inventoryItemContainer: Locator;
    readonly image: Locator;
    readonly itemImageLink: Locator;
    readonly itemName: Locator;
    readonly titleLink: Locator;
    readonly itemDescription: Locator;
    readonly itemQuantity: Locator;
    readonly price: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;

    constructor(page: Page, containerIdentifier: string|number) {
        this.page = page;
        this.inventoryItemContainer = this.#getItemContainerLocator(containerIdentifier);
        this.image = this.inventoryItemContainer.locator('.inventory_item_img').locator('img');;
        this.itemImageLink = this.inventoryItemContainer.locator('.inventory_item_img').locator('a');
        this.itemName = this.inventoryItemContainer.getByTestId('inventory-item-name');
        this.titleLink = this.inventoryItemContainer.locator('a');
        this.itemDescription = this.inventoryItemContainer.getByTestId('inventory-item-desc');
        this.itemQuantity = this.inventoryItemContainer.getByTestId('item-quantity');
        this.price = this.inventoryItemContainer.getByTestId('inventory-item-price');
        this.addToCartButton = this.inventoryItemContainer.getByRole('button', {name: 'Add to cart'});
        this.removeFromCartButton = this.inventoryItemContainer.getByRole('button', {name: 'Remove'});
    }

    #getItemContainerLocator(containerIdentifier: string|number): Locator {
        // consider containerIdentifier as item name
        const itemContainer = this.page
        .getByTestId("inventory-item");
        if(typeof containerIdentifier === 'string') {
            return itemContainer.filter({has: this.page.getByText(containerIdentifier)})
            // return this.page.locator(
            //     `//*[text()="${containerIdentifier}"]/../../../..`
            //   );
        }
        // consider containerIdentifier as item by index in list
        return itemContainer
        .nth(containerIdentifier);
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }

    async clickRemoveFromCartButton() {
        await this.removeFromCartButton.click();
    }

    async expectItemImageToNotBeDisplayed() {
        await expect(this.image, 'Item image should not be visible').toBeHidden();
    }

    async expectItemImageToBeCorrect() {
        await expect(this.image, 'Item image should be visible').toBeVisible();
        await expect(this.itemImageLink, 'Item image link should be enabled').toBeEnabled();
    }

    async expectItemNameToBeCorrect(expectedItemName: string) {
        await expect(this.itemName, 'Item name should have correct text').toHaveText(expectedItemName);
        await expect(this.titleLink, 'Item title link should be enabled').toBeEnabled();
    }

    async expectItemDescriptionToBeCorrect(expectedItemDescription: string) {
        await expect(this.itemDescription, 'Item description should be visible').toBeVisible();
        await expect(this.itemDescription, 'Item description should have correct text').toHaveText(expectedItemDescription);
    }

    async expectItemQuantityToBeCorrect(expectedItemQuantity: number) {
        await expect(this.itemQuantity, 'Item quantity label should be visible').toBeVisible();
        await expect(this.itemQuantity, 'Item quantity label should have correct text').toHaveText(expectedItemQuantity.toString());
    }

    async expectItemPriceToBeCorrect(expectedItemPrice: string) {
        await expect(this.price, 'Item price label should be visible').toBeVisible();
        await expect(this.price, 'Item price label should have expected price').toHaveText(expectedItemPrice);
    }

    async expectAddToCartButtonToBeDisplayed() {
        await expect(this.addToCartButton, 'Add to cart button should be visible').toBeVisible();
    }

    async expectRemoveFromCartButtonToBeDisplayed() {
        await expect(this.removeFromCartButton, 'Remove from cart button should be visible').toBeVisible();
        await expect.soft(this.removeFromCartButton, 'Remove from cart button should be colored red').toHaveCSS('color', 'rgb(226, 35, 26)');
    }
}

