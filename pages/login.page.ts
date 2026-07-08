import {test, expect,Locator,Page} from '@playwright/test';

export class LoginPage
{
    usernameInput : Locator;
    passwordInput : Locator;
    loginButton : Locator;
    page :Page;

    constructor(page:Page)
    {
        this.page =page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async goto() 
    {
        await this.page.goto('/');
    }   

    async verifyLoginPageLoaded()
    {
    //await expect(this.page).toHaveURL(TestData.urls.login);
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
    
    async login(username: string, password: string)  
    {
        await this.usernameInput.fill(username); //need to put in data
        await this.passwordInput.fill(password); //need to put in data
        await this.loginButton.click();
    }
}