import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage{
    readonly page: Page;
    readonly openMenuBtn: Locator;
    readonly logoutMenuOption: Locator;

    readonly itemCard: (itemName: string) => Locator;
    readonly itemAddToCartBtn: (itemName: string) => Locator;
    readonly itemRemoveFromCartBtn: (itemName: string) => Locator;
    
    readonly cartBadge: Locator;
    ß

    constructor(page: Page){
        this.page = page;
        this.openMenuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.logoutMenuOption = page.locator('[data-test="logout-sidebar-link"]');

        this.itemCard = (itemName: string) => page.locator(`//div[(@data-test="inventory-item-description") and (descendant::div[text() = "${itemName}"])]`);
        this.itemAddToCartBtn = (itemName: string) => this.itemCard(itemName).getByRole('button', { name: 'Add to cart' });
        this.itemRemoveFromCartBtn = (itemName: string) => this.itemCard(itemName).getByRole('button', { name: 'Remove' });
        
        this.cartBadge = page.locator('[data-test="shopping-cart-link"]');
    }

    /**
     * Adds a specified item to the cart by clicking the "Add to Cart" button multiple times.
     * Verifies that the "Remove from Cart" button becomes visible afterward.
     *
     * @param {string} itemName - The name of the item to add to the cart.
     * @param {number} amount - The number of times the item should be added to the cart.
     */
    async addItemToCart(itemName: string, amount: number) {
        await this.itemAddToCartBtn(itemName).click( { clickCount: amount });
        await expect(this.itemRemoveFromCartBtn(itemName)).toBeVisible();
    }
}