
import { test } from '../../fixtures/test.fixture';

const itemName = 'Sauce Labs Backpack';
const expectedItemDescription = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
const expectedItemPrice = '$29.99';

test.beforeEach(async ({loginAsStandartUser}) => {
  await loginAsStandartUser();
});

test('E2E: Verify that user can checkout with added item in card', async ({inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage}) => {
  await inventoryPage.mainHeader.expectHeaderDisplayedCorrectly();
  await inventoryPage.mainHeader.expectShoppingCartBadgeToNotBeDisplayed();
  await inventoryPage.secondaryHeader.expectSecondaryHeaderDisplayedCorrectly('Products');
  await inventoryPage.secondaryHeader.expectSortProductsSelectToBeCorrectlyDisplayed('Name (A to Z)');
  await inventoryPage.footer.expectFooterDisplayedCorrectly();

  const itemCard = inventoryPage.getItemCardByName(itemName);
  await itemCard.clickAddToCartButton();
  await itemCard.expectRemoveFromCartButtonToBeDisplayed();
  await inventoryPage.mainHeader.expectShoppingCartBadgeToBeCorrectlyDisplayed(1);
  await inventoryPage.mainHeader.clickOnShoppingCartButton();

  await cartPage.expectPageToBeDisplayed();
  await cartPage.mainHeader.expectHeaderDisplayedCorrectly();
  await cartPage.mainHeader.expectShoppingCartBadgeToBeCorrectlyDisplayed(1);
  await cartPage.secondaryHeader.expectSecondaryHeaderDisplayedCorrectly('Your Cart');
  await cartPage.secondaryHeader.expectSortProductsSelectToNotBeDisplayed();
  await cartPage.footer.expectFooterDisplayedCorrectly();
  await cartPage.expectCheckoutButtonIsDisplayedAndEnabled();
  await cartPage.expectContinueShoppingButtonIsDisplayedAndEnabled();

  const cartItem = cartPage.getItemCardByIndexInList(0);
  await cartItem.expectItemDescriptionToBeCorrect(expectedItemDescription);
  await cartItem.expectItemNameToBeCorrect(itemName)
  await cartItem.expectRemoveFromCartButtonToBeDisplayed();
  await cartItem.expectItemQuantityToBeCorrect(1)
  await cartItem.expectItemPriceToBeCorrect(expectedItemPrice);
  await cartItem.expectItemImageToNotBeDisplayed();
  await cartPage.clickOnCheckoutButton();

  await checkoutStepOnePage.expectPageToBeDisplayed();
  await checkoutStepOnePage.expectCheckoutFormCorrectlyDisplayedByDefault();
  await checkoutStepOnePage.mainHeader.expectHeaderDisplayedCorrectly();
  await checkoutStepOnePage.mainHeader.expectShoppingCartBadgeToBeCorrectlyDisplayed(1);
  await checkoutStepOnePage.secondaryHeader.expectSecondaryHeaderDisplayedCorrectly('Checkout: Your Information');
  await checkoutStepOnePage.secondaryHeader.expectSortProductsSelectToNotBeDisplayed();
  await checkoutStepOnePage.footer.expectFooterDisplayedCorrectly();
  await checkoutStepOnePage.expectCancelButtonIsDisplayedAndEnabled();
  await checkoutStepOnePage.expectContinueButtonIsDisplayedAndEnabled();
  await checkoutStepOnePage.fillCheckoutForm({
    firstName: 'Fedya',
    lastName: 'Shevchenko',
    postalCode: '13096',
  });
  await checkoutStepOnePage.clickOnContinueButton();

  await checkoutStepTwoPage.expectPageToBeDisplayed();
  await checkoutStepTwoPage.mainHeader.expectHeaderDisplayedCorrectly();
  await checkoutStepTwoPage.mainHeader.expectShoppingCartBadgeToBeCorrectlyDisplayed(1);
  await checkoutStepTwoPage.secondaryHeader.expectSecondaryHeaderDisplayedCorrectly('Checkout: Overview');
  await checkoutStepTwoPage.secondaryHeader.expectSortProductsSelectToNotBeDisplayed();
  await checkoutStepTwoPage.footer.expectFooterDisplayedCorrectly();
  await checkoutStepTwoPage.expectCancelButtonIsDisplayedAndEnabled();
  await checkoutStepTwoPage.expectFinishButtonIsDisplayedAndEnabled();
  await checkoutStepTwoPage.expectPaymentInformationIsCorrect('SauceCard #31337');
  await checkoutStepTwoPage.expectShippingInformationIsCorrect('Free Pony Express Delivery!');
  await checkoutStepTwoPage.expectPriceTotalIsCorrect(`Item total: ${expectedItemPrice}`, 'Tax: $2.40');
  await checkoutStepTwoPage.expectTotalPriceIsCorrect('Total: $32.39');
  await checkoutStepTwoPage.clickOnFinishButton();

  await checkoutCompletePage.expectPageToBeDisplayed();
  await checkoutCompletePage.mainHeader.expectHeaderDisplayedCorrectly();
  await checkoutCompletePage.mainHeader.expectShoppingCartBadgeToNotBeDisplayed();
  await checkoutCompletePage.secondaryHeader.expectSecondaryHeaderDisplayedCorrectly('Checkout: Complete!');
  await checkoutCompletePage.secondaryHeader.expectSortProductsSelectToNotBeDisplayed();
  await checkoutCompletePage.footer.expectFooterDisplayedCorrectly();

  await checkoutCompletePage.clickOnBackHomeButton();
  await inventoryPage.expectPageToBeDisplayed();
});
