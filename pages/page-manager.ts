import {Page} from '@playwright/test';
import { LoginPage } from "./login.page";
import { ProductPage } from "./product.page";
import { CartPage } from "./cart.page";
import { CheckoutInfoPage } from './checkout-info.page';
import { CheckoutOverviewPage } from './checkout-overview.page';
import { CheckoutCompletePage } from './checkout-complete.page';
//import { CartPage } from './cart.page';



export class PageManager
{
    readonly loginPage: LoginPage;
    readonly productPage: ProductPage;
    readonly cartPage:CartPage;
    //readonly cartPage:CartPage;
    readonly checkoutInfoPage: CheckoutInfoPage;
    readonly checkoutOverviewPage: CheckoutOverviewPage;
    readonly checkoutCompletePage : CheckoutCompletePage;

constructor(page:Page)
{

    this.loginPage = new LoginPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutInfoPage = new CheckoutInfoPage(page);
    this.checkoutOverviewPage = new CheckoutOverviewPage(page);
    this.checkoutCompletePage = new CheckoutCompletePage(page);
}

// getLoginPage()
// {
//     return this.loginPage;
// }

// getCartPage()
// {
//     return this.cartPage;
// }


}

