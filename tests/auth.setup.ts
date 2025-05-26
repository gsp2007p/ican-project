import { test as setup, expect } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { LoginPage } from '../pom/login-page'; 

const authFile = path.join(__dirname, '../.auth/user.json');
//const authFile = path.resolve('./.auth/user.json');


setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('');
    await loginPage.loginWithCredentials(process.env.USERNAME!, process.env.USERPASS!);
    await page.waitForLoadState('networkidle');
    await page.context().storageState({ path: authFile });
});