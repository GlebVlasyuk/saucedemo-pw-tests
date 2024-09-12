import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

type TFillFormParams = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutStepOnePage extends BasePage {
  readonly page: Page;
  readonly pageContainer: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageContainer = this.page.getByTestId("checkout-info-container");
    this.firstNameInput = this.pageContainer.getByTestId("firstName");
    this.lastNameInput = this.pageContainer.getByTestId("lastName");
    this.postalCodeInput = this.pageContainer.getByTestId("postalCode");
    this.continueButton = this.pageContainer.getByTestId("continue");
    this.cancelButton = this.pageContainer.getByTestId("cancel");
  }

  async open(): Promise<void> {
    const urlPath = "/checkout-step-one.html";
    await this.page.goto(urlPath);
    await this.page.waitForURL(urlPath);
  }

  async expectPageToBeDisplayed(): Promise<void> {
    await expect(
      this.pageContainer,
      "Checkout Step one page container should be visible"
    ).toBeVisible();
  }

  async fillFirstNameField(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await expect(
      this.firstNameInput,
      "First name input should be filled correctly"
    ).toHaveValue(firstName);
  }

  async fillLastNameField(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
    await expect(
      this.lastNameInput,
      "Last name input should be filled correctly"
    ).toHaveValue(lastName);
  }

  async fillPostalField(postalCode: string): Promise<void> {
    await this.postalCodeInput.fill(postalCode);
    await expect(
      this.postalCodeInput,
      "Postal code input should be filled correctly"
    ).toHaveValue(postalCode);
  }

  async fillCheckoutForm({ firstName, lastName, postalCode }: TFillFormParams) {
    await this.fillFirstNameField(firstName);
    await this.fillLastNameField(lastName);
    await this.fillPostalField(postalCode);
  }

  async clickOnContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  async expectCheckoutFormCorrectlyDisplayedByDefault(): Promise<void> {
    await expect(
      this.firstNameInput,
      "First name input should be visible"
    ).toBeVisible();
    await expect(
      this.firstNameInput,
      "First name input should be enabled"
    ).toBeEnabled();
    await expect
      .soft(this.firstNameInput, "First name input should be empty be default")
      .toBeEmpty();
    await expect(
      this.lastNameInput,
      "Last name input should be visible"
    ).toBeVisible();
    await expect(
      this.lastNameInput,
      "Last name input should be enabled"
    ).toBeEnabled();
    await expect
      .soft(this.lastNameInput, "Last name input should be empty be default")
      .toBeEmpty();
    await expect(
      this.postalCodeInput,
      "Postal code input should be visible"
    ).toBeVisible();
    await expect(
      this.postalCodeInput,
      "Postal code input should be enabled"
    ).toBeEnabled();
    await expect
      .soft(
        this.postalCodeInput,
        "Postal code input should be empty be default"
      )
      .toBeEmpty();
    await expect
      .soft(
        this.postalCodeInput,
        "Postal code input should have correct placeholder value"
      )
      .toHaveAttribute("placeholder", "Zip/Postal Code");
  }

  async expectContinueButtonIsDisplayedAndEnabled(): Promise<void> {
    await expect(
      this.continueButton,
      "Continue button should be visible"
    ).toBeVisible();
    await expect(
      this.continueButton,
      "Continue button should be enabled"
    ).toBeEnabled();
  }

  async expectCancelButtonIsDisplayedAndEnabled(): Promise<void> {
    await expect(
      this.cancelButton,
      "Cancel button should be visible"
    ).toBeVisible();
    await expect(
      this.cancelButton,
      "Cancel button should be enabled"
    ).toBeEnabled();
  }
}
