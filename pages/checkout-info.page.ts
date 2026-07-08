import {test, expect,Locator,Page} from '@playwright/test';

export class CheckoutInfoPage
{
    firstNameInput : Locator;
    lastNameInput : Locator;
    postalCodeInput : Locator;
    continueButton : Locator;
    page : Page;

    constructor(page:Page)
    {
        this.page =page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    
    }
     async verifyCheckoutInfoPage() 
    {
        await expect(this.page).toHaveURL(/checkout-step-one\.html/);
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.postalCodeInput).toBeVisible();
    }

    async fillCustomerInfo(firstName: string, lastName: string, postalCode:string)
    {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout()
    {
        await this.continueButton.click();
    }
  
}