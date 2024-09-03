import { expect, Locator, Page } from "@playwright/test";

type TSortProductsSelectOptions = 'Name (A to Z)' | 'Name (Z to A)' | 'Price (low to high)' | 'Price (high to low)';

export class SecondaryHeader {
    readonly page: Page;
    readonly headerContainer: Locator;
    readonly title: Locator;
    readonly sortProductsSelect: Locator;
    readonly sortProductsLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerContainer = this.page.getByTestId('secondary-header');
        this.title = this.headerContainer.getByTestId('title')
        this.sortProductsLabel = this.headerContainer.getByTestId('active-option');
        this.sortProductsSelect = this.headerContainer.getByTestId('product-sort-container');
    }

    async expectSecondaryHeaderDisplayedCorrectly(expectedTitleText: string): Promise<void> {
        await expect(this.headerContainer, 'Secondaty Header should be displayed').toBeVisible();
        await expect(this.title, 'Secondaty Header title should be displayed').toBeVisible();
        await expect(this.title, 'Secondaty Header title should have correct text').toHaveText(expectedTitleText);
    }

    async expectSortProductsSelectToBeCorrectlyDisplayed(expectedSortSelectOption: TSortProductsSelectOptions): Promise<void> {
        await expect(this.sortProductsSelect, 'Sort products select should be visible').toBeVisible();
        await expect(this.sortProductsSelect, 'Sort products select should be enabled').toBeEnabled();
        await expect(this.sortProductsLabel, 'Sort product label should have correct text').toHaveText(expectedSortSelectOption);
    }

    async expectSortProductsSelectToNotBeDisplayed(): Promise<void> {
        await expect(this.sortProductsSelect, 'Sort products select should not be displayed').toBeHidden();
    }
}