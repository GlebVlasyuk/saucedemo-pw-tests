import {test as base} from './base-test.fixture'
import { LoginPage, InventoryPage, CartPage, CheckoutCompletePage, CheckoutStepOnePage, CheckoutStepTwoPage } from '../pages';
import {EValidUsers, EInvalidUsers, ESupportedPassword} from '../support/enums/supported-user-creds';
import { Page } from '@playwright/test';

type TPages = {
    loginPage: LoginPage,
    inventoryPage: InventoryPage,
    cartPage: CartPage,
    checkoutStepOnePage: CheckoutStepOnePage,
    checkoutStepTwoPage: CheckoutStepTwoPage,
    checkoutCompletePage: CheckoutCompletePage,
    loginAsStandartUser: () => Promise<void>,
};

const loginAs = async (page: Page, username: EValidUsers | EInvalidUsers, password: ESupportedPassword): Promise<void> => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(username, password);
    await new InventoryPage(page).expectPageToBeDisplayed();
};

export const test = base.extend<TPages>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    },
    checkoutStepOnePage: async ({page}, use) => {
        await use(new CheckoutStepOnePage(page));
    },
    checkoutStepTwoPage: async ({page}, use) => {
        await use(new CheckoutStepTwoPage(page));
    },
    checkoutCompletePage: async ({page}, use) => {
        await use(new CheckoutCompletePage(page));
    },
    loginAsStandartUser: async ({page}, use) => {
        const loginAsStandartUser = async () => {
            await loginAs(page, EValidUsers.STANDART_USER, ESupportedPassword.PASSWORD);
        };
        await use(loginAsStandartUser);
    },
    loginAsLockedUser: async ({page}, use) => {
        const loginAsLockedUser = async () => {
            await loginAs(page, EInvalidUsers.LOCKED_OUT_USER, ESupportedPassword.PASSWORD);
        };
        await use(loginAsLockedUser);
    },
});