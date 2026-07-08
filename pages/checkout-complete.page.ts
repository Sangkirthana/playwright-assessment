import {test, expect,Locator,Page} from '@playwright/test';

export class CheckoutCompletePage
{
    completeHeader : Locator;
    completeText : Locator;
    pageTitle6 : Locator;
    backHomebutton : Locator;
    page : Page;

    constructor(page:Page)
    {
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.pageTitle6 = page.locator('[data-test="title"]');
        this.backHomebutton = page.locator('[data-test="back-to-products"]');
        this.page =page;
    
    }
     
    async verifyOrderSuccess()
    {
        await expect(this.page).toHaveURL(/checkout-complete\.html/);
        await expect(this.pageTitle6).toHaveText("Checkout: Complete!");
        await expect(this.completeHeader).toHaveText("Thank you for your order!");
        await expect(this.completeText).toContainText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");

    }

    async backHome()
    {
    await this.backHomebutton.click();
    }
  
}