import { test, expect } from '@playwright/test';

import { PageManager } from '../../pages/page-manager'
import { TestData } from '../../data/testData';



test(`Client App login`, async ({page})=>
 {
    const pages = new PageManager(page);

    // Login flow
    await pages.loginPage.goto();
    await pages.loginPage.verifyLoginPageLoaded();
    await pages.loginPage.login(
      TestData.user.credential.username,
      TestData.user.credential.password
    );

    // Product selection & cart validation
    await pages.productPage.verifyProductPageLoaded();

    const productName = await pages.productPage.getFirstProductName();
    const price = await pages.productPage.getFirstProductPrice();

    await pages.productPage.addFirstProductToCart();
    await pages.productPage.verifyCartItemCount(1);
    await pages.productPage.openCart();

     // Cart verification
    await pages.cartPage.verifyCartPageLoaded();
    await pages.cartPage.verifyCartHasProduct(productName);
    await pages.cartPage.proceedToCheckout();

    // Checkout information
    await pages.checkoutInfoPage.verifyCheckoutInfoPage();
    await pages.checkoutInfoPage.fillCustomerInfo(
      TestData.user.checkout.firstName,
      TestData.user.checkout.lastName,
      TestData.user.checkout.postalCode
    );
    await pages.checkoutInfoPage.continueCheckout();

    // Order summary verification
    await pages.checkoutOverviewPage.verifyFinishButton();
    await pages.checkoutOverviewPage.verifyContainsProduct(productName);

    await pages.checkoutOverviewPage.verifyItemValue(price);
    const tax = await pages.checkoutOverviewPage.verifyTaxValue(price);
    const total = await pages.checkoutOverviewPage.verifyTotalValue(price,tax);

    await pages.checkoutOverviewPage.completePurchase();

    // Order completion
    await pages.checkoutCompletePage.verifyOrderSuccess();
    await pages.checkoutCompletePage.backHome();

     // Final verification
    await pages.productPage.verifyProductPageLoaded();
     
 })