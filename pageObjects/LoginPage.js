const {expect} = require('@playwright/test');

class LoginPage
{
    constructor(page)
    {
        this.page=page;
        this.logInBtn = page.locator("[value='Login']");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async goto(url)
    {
        await this.page.goto(url);
    }

    async validLogin(username,password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.logInBtn.click();
        await this.page.locator("div.card-body").first().waitFor(); //waiting for the page to load up by checking for the presence of first item
    }
}

module.exports ={LoginPage};