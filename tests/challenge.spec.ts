import { expect } from "@playwright/test";
import { test } from '../tests/fixtures/callenge-fixture'
import { faker } from "@faker-js/faker";


import { LoginPage } from "../pom/login-page";
import { InventoryPage } from "../pom/inventory-page";
import { CartPage } from "../pom/cart-page";
import { CheckoutPage } from "../pom/checkout-page";

import { loginErrorMessages, checkoutMessages } from "./data/appMessages";

test.describe('Login tests', () =>{
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    //Do not use storageState
    test.use({ storageState: { cookies: [], origins: [] } });

    [
        { user: 'standard_user', pass: 'secret_sauce' },
        { user: 'visual_user', pass: 'secret_sauce' },
    ].forEach(({ user, pass }) => {
        test(`Login successfully with username: ${user}`, async ({ page }) => {
            loginPage = new LoginPage(page);
            inventoryPage = new InventoryPage(page);

            await page.goto('/');
            await loginPage.loginWithCredentials(user, pass);
            await expect(inventoryPage.openMenuBtn).toBeVisible();
            await expect(page).toHaveURL('/inventory.html');
            await inventoryPage.openMenuBtn.click();
            await expect(inventoryPage.logoutMenuOption).toBeVisible();
        });
    }); 

    test('Login with Locked User', async ({ page }) => {
        loginPage = new LoginPage(page);
        
        await page.goto('/');
        await loginPage.loginWithCredentials('locked_out_user', 'secret_sauce');
        expect(await loginPage.errorMessage.textContent()).toBe(loginErrorMessages.lockedUser);
    });
});

test.describe('Add Items to Cart', () =>{
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test('Add Multiple Items to Cart and Complete Checkout', async ({ inventoryFixturePage }) => {
        loginPage = new LoginPage(inventoryFixturePage);
        inventoryPage = new InventoryPage(inventoryFixturePage);
        cartPage = new CartPage(inventoryFixturePage);
        checkoutPage = new CheckoutPage(inventoryFixturePage);

        const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];
        
        for(let item of itemsToAdd){
            await inventoryPage.addItemToCart(item, 1);
        }
        await expect(inventoryPage.cartBadge).toHaveText('3');
        await inventoryPage.cartBadge.click();

        for(let item of itemsToAdd){
            await expect(cartPage.itemNameLink(item)).toBeVisible();
        }

        await cartPage.checkoutBtn.click();
        await expect(checkoutPage.firstName).toBeVisible();
        
        const checkoutData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };

        await checkoutPage.checkoutCart(checkoutData);
        await expect(checkoutPage.finishBtn).toBeVisible();
        await checkoutPage.finishBtn.click();
        await expect(checkoutPage.orderMessage(checkoutMessages.thankouForYourOrder)).toBeVisible();
        await expect(checkoutPage.orderMessage(checkoutMessages.orderDispached)).toBeVisible();
    });

})