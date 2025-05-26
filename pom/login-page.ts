import { Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    /**
     * Logs in by filling in the username and password fields and clicking the login button.
     *
     * @param {string} username - The username to use for login.
     * @param {string} password - The password to use for login.
     */
    async loginWithCredentials(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}