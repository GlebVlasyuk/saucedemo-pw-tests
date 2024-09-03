import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly loginLogo: Locator;
    readonly pageContainer: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginCredentials: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.loginLogo = this.page.locator('.login_logo');
        this.pageContainer = this.page.getByTestId('login-container');
        this.usernameInput = this.pageContainer.locator('#user-name');
        this.passwordInput = this.pageContainer.locator('#password');
        this.loginButton = this.pageContainer.locator('#login-button');
        this.loginCredentials = this.pageContainer.locator('.login_credentials_wrap-inner');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
        await this.page.waitForURL('/');
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
        await expect(this.usernameInput, 'Username input should have correct value').toHaveValue(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
        await expect(this.passwordInput, 'Password input should have correct value').toHaveValue(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async expectPageToBeDisplayed(): Promise<void> {
        await expect(this.pageContainer, 'Login page container should be visible').toBeVisible();
    }

    async expectLoginPageIsCorrectlyDisplayedByDefault(): Promise<void> {
        await expect(this.usernameInput, 'Username login input should be visible').toBeVisible();
        await expect(this.usernameInput, 'Username login input should be enabled').toBeEnabled();
        await expect(this.passwordInput, 'Password login input should be visible').toBeVisible();
        await expect(this.passwordInput, 'Password login input should be enabled').toBeEnabled();
        await expect(this.loginButton, 'Login button should be visible').toBeVisible();
        await expect(this.loginButton, 'Login button should be enabled').toBeEnabled();

        await expect.soft(this.usernameInput, 'Username login input should be empty by default').toHaveValue('');
        await expect.soft(this.passwordInput, 'Password login input should be empty by default').toHaveValue('');
        await expect.soft(this.loginButton, 'Login button should be have correct text').toHaveText('Login');
                // TODO add to fixtures
        await expect.soft(this.loginButton, 'Login button should be have coorect color').toHaveCSS('background-color', 'rgb(61, 220, 145)');
        await expect.soft(this.loginLogo, 'Login logo should have coorect text').toHaveText('Swag Labs');
        await expect.soft(this.loginCredentials, 'Login creds container should be visible').toBeVisible();
    }
}