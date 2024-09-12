import { test } from '../fixtures/test.fixture';
import {EValidUsers, ESupportedPassword} from '../support/enums/supported-user-creds';

test.beforeEach(async ({loginPage}) => {
  await loginPage.open();
});

test('Verify login page is correctly displayed', async ({loginPage}) => {
  await loginPage.expectPageToBeDisplayed();
  await loginPage.expectLoginPageIsCorrectlyDisplayedByDefault();
});

Object.values(EValidUsers).forEach((user) => {
  test(`Verify valid "${user}" user can login to SauceDemo`, async ({loginPage, inventoryPage}) => {
    await loginPage.login(user, ESupportedPassword.PASSWORD);
    await inventoryPage.expectPageToBeDisplayed();
  });
});