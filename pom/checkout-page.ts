import { Locator, Page } from "@playwright/test";
import { CheckoutData } from "../utils/customTypes";

export class CheckoutPage{
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly finishBtn: Locator;
    readonly orderMessage: (message: string) => Locator;

    
    constructor(page: Page){
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.orderMessage = (message: string) => page.getByText(message);
    }

    /**
     * Fills the checkout form with the provided user data.
     *
     * @param {CheckoutData} checkoutData - Object containing first name, last name, and postal code.
     */
    async fillCheckoutWithData(checkoutData: CheckoutData) {
        await this.firstName.fill(checkoutData.firstName);
        await this.lastName.fill(checkoutData.lastName);
        await this.postalCode.fill(checkoutData.postalCode);
    }

    /**
     * Completes the checkout form and proceeds to the next step by clicking the continue button.
     *
     * @param {CheckoutData} checkoutData - Object containing user information required for checkout.
     */
    async checkoutCart(checkoutData: CheckoutData) {
        await this.fillCheckoutWithData(checkoutData);
        await this.continueBtn.click();
    }
}