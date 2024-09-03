import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { InventoryItem } from "../components/inventory-item.component";

export class CheckoutStepTwoPage extends BasePage {
    readonly page: Page;
    readonly pageContainer: Locator;
    readonly cancelButton: Locator;
    readonly finishButton: Locator;
    readonly cartDescriptionLabel: Locator;
    readonly cartQuantityLabel: Locator;
    readonly paymentInformationLabel: Locator;
    readonly paymentInformationValue: Locator;
    readonly shippingInformationLabel: Locator;
    readonly shippingInformationValue: Locator;
    readonly priceTotalLabel: Locator;
    readonly subTotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pageContainer = this.page.getByTestId("checkout-summary-container");
        this.cartQuantityLabel = this.pageContainer.getByTestId("cart-quantity-label");
        this.cartDescriptionLabel = this.pageContainer.getByTestId("cart-desc-label");
        this.paymentInformationLabel = this.pageContainer.getByTestId("payment-info-label");
        this.paymentInformationValue = this.pageContainer.getByTestId("payment-info-value");
        this.shippingInformationLabel = this.pageContainer.getByTestId("shipping-info-label");
        this.shippingInformationValue = this.pageContainer.getByTestId("shipping-info-value");
        this.priceTotalLabel = this.pageContainer.getByTestId("total-info-label");
        this.subTotalLabel = this.pageContainer.getByTestId("subtotal-label");
        this.taxLabel = this.pageContainer.getByTestId("tax-label");
        this.totalLabel = this.pageContainer.getByTestId("total-label");
        this.shippingInformationValue = this.pageContainer.getByTestId("shipping-info-value");
        this.finishButton = this.pageContainer.getByTestId("finish");
        this.cancelButton = this.pageContainer.getByTestId("cancel");
    }

    async open(): Promise<void> {
        await this.page.goto("/checkout-step-two.html");
        await this.page.waitForURL("/");
      }
    
      async expectPageToBeDisplayed(): Promise<void> {
        await expect(
          this.pageContainer,
          "Checkout Step two page container should be visible"
        ).toBeVisible();
      }

      getItemCardByIndexInList(itemIndex: number): InventoryItem {
        return new InventoryItem(this.page, itemIndex);
      }
      
      async clickOnFinishButton(): Promise<void> {
        await this.finishButton.click();
      }

      async expectPaymentInformationIsCorrect(expectedPaymentInformation: string): Promise<void> {
        await expect(this.paymentInformationLabel, 'Payment information label should have correct text').toHaveText('Payment Information:');
        await expect(this.paymentInformationValue, 'Payment information value should be correct').toHaveText(expectedPaymentInformation);
      }

      async expectShippingInformationIsCorrect(expectedShippingInformation: string): Promise<void> {
        await expect(this.shippingInformationLabel, 'Shipping information label should have correct text').toHaveText('Shipping Information:');
        await expect(this.shippingInformationValue, 'Shipping information value should be correct').toHaveText(expectedShippingInformation);
      }

      async expectPriceTotalIsCorrect(expectedPriceTotal: string, expectedTax: string): Promise<void> {
        await expect(this.priceTotalLabel, 'Price total label should have correct text').toHaveText('Price Total');
        await expect(this.subTotalLabel, 'Price total label value should be correct').toHaveText(expectedPriceTotal);
        await expect(this.taxLabel, 'Tax label value should be correct').toHaveText(expectedTax);
      }

      async expectTotalPriceIsCorrect(expectedTotalPrice: string): Promise<void> {
        await expect(this.totalLabel, 'Total price label should be correct').toHaveText(expectedTotalPrice);
      }

      async expectFinishButtonIsDisplayedAndEnabled(): Promise<void> {
        await expect(this.finishButton, 'Finish button should be visible').toBeVisible();
        await expect(this.finishButton, 'Finish button should be enabled').toBeEnabled();
        await expect.soft(this.finishButton, 'Finish button should be have correct color').toHaveCSS('background-color', 'rgb(61, 220, 145)');
      }

      async expectCancelButtonIsDisplayedAndEnabled(): Promise<void> {
        await expect(this.cancelButton, 'Cancel button should be visible').toBeVisible();
        await expect(this.cancelButton, 'Cancel button should be enabled').toBeEnabled();
      }

}