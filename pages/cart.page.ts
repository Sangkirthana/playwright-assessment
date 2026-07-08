import {test, expect,Locator,Page} from '@playwright/test';

export class CartPage
{
    pageTitle2 : Locator;
    cartItems  : Locator;
    itemQuantity  : Locator;
    checkoutButton : Locator;
    page :Page;
    
    constructor(page:Page)
    {
    this.page =page;
    this.pageTitle2 = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async verifyCartPageLoaded()
    {
        await expect(this.page).toHaveURL(/cart\.html/);
        await expect(this.pageTitle2).toHaveText("Your Cart");
    }

    async verifyCartHasProduct(productName: string)
    {
        await expect(this.cartItems).toHaveCount(1);
        await expect(this.cartItems.first()).toHaveText(productName);
    }

    async proceedToCheckout()
    {
        await this.checkoutButton.click();
    }


}