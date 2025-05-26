import { Locator, Page } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly itemNameLink: (itemName: string) => Locator;
    readonly checkoutBtn: Locator;
    
    
    constructor(page: Page){
        this.page = page;
        
        this.itemNameLink = (itemName: string) => page.locator('div[data-test="inventory-item-name"]', { hasText: itemName });
        this.checkoutBtn = page.locator('[data-test="checkout"]');
    }

}