import {test, expect,Locator,Page} from '@playwright/test';
import { ProductPage } from './product.page';

export class CheckoutOverviewPage
{
    cartItems : Locator;
    finishButton : Locator;
    itemsValue : Locator;
    taxValue : Locator;
    totalValue : Locator;
    page : Page;

    constructor(page:Page)
    {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item-name"]');
        this.itemsValue = page.locator('[data-test="subtotal-label"]');
        this.taxValue = page.locator('[data-test="tax-label"]');
        this.totalValue = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
     
    async verifyFinishButton()
    {
        await expect(this.page).toHaveURL(/checkout-step-two\.html/);
        await expect(this.finishButton).toBeVisible();
    }

    async verifyContainsProduct(productName: string)
    {
        await expect(this.cartItems).toHaveCount(1);
        await expect(this.cartItems.first()).toHaveText(productName);
        //console.log(productName)
    }

        async verifyItemValue(price:string)
    {
        const itemPrice = await this.itemsValue.textContent();
        console.log("actualPrice" + price)
        console.log("itemPrice" + itemPrice)
        const bool =  expect(itemPrice).toContain(price);
    
    }

    async verifyTaxValue(price:string)
    {
    const newprice = Number(price)
    const tax = Number((newprice * 0.08).toFixed(2));
    const itemTax = parseFloat((await this.taxValue.textContent())!.replace('$', '').trim());
    expect(itemTax).toBe(tax)
    console.log(typeof(tax))
    return tax;
    
    }
    
     async verifyTotalValue(price:string, tax:number)
     {
    const newprice = Number(price)
    const total = newprice + tax
    //  console.log("+++++++++++++++++++++++++")
    // console.log(typeof(total))
    const itemtotal2 = await this.totalValue.textContent()
    const itemtotal = +((await this.totalValue.innerText()).replace(/[^0-9.]/g, ''));
    //expect(itemtotal2).toContain("total");
    // console.log("+++++++++++++++++++++++++")
    // console.log(itemtotal)
    // console.log(typeof(itemtotal))
    const total2 = newprice + itemtotal

     }

    async completePurchase()
    {
        await this.finishButton.click();
    }
  
}