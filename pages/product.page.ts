import {test, expect,Locator,Page} from '@playwright/test';

export class ProductPage
{
    pageTitle1 : Locator;
    inventoryItems : Locator;
    cartLink : Locator;
    cartBadge : Locator;
    page : Page;

    constructor(page:Page)
    {
    this.page = page;
    this.pageTitle1 = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }
      
    async verifyProductPageLoaded()
    {
    await expect(this.page).toHaveURL(/inventory\.html$/);
    await expect(this.pageTitle1).toHaveText("Products");
    await expect(this.inventoryItems.first()).toBeVisible();
    }

    async getFirstProductName()
    {
    const name = await this.inventoryItems.first().locator('[data-test="inventory-item-name"]').textContent();
    return name!.trim();
    }

    async getFirstProductPrice()
    {
    const price = await this.inventoryItems.first().locator('[data-test="inventory-item-price"]').textContent();
    //console.log(price)
    //console.log(typeof price)
    return price!.trim();

    }

    


    async addFirstProductToCart()
    {
    await this.inventoryItems.first().locator('[data-test^="add-to-cart"]').click();
    }

    async verifyCartItemCount(count: number)
    {
    await expect(this.cartBadge).toHaveText(String(count));
    }

    async openCart()
    {
    await this.cartLink.click();
    }

}