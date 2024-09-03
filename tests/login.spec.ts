import { test } from '../fixtures/test.fixture';
import {ESupportedUsers, ESupportedPassword} from '../support/enums/supported-user-creds';

test.beforeEach(async ({loginPage}) => {
  await loginPage.open();
});

test('Verify login page is correctly displayed', async ({loginPage}) => {
  await loginPage.expectPageToBeDisplayed();
  await loginPage.expectLoginPageIsCorrectlyDisplayedByDefault();
});

test(`Verify user can login as "${ESupportedUsers.STANDART_USER}" user`, async ({loginPage, inventoryPage}) => {
  await loginPage.login(ESupportedUsers.STANDART_USER, ESupportedPassword.PASSWORD);
  await inventoryPage.expectPageToBeDisplayed();
});
