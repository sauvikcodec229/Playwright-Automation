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
    }
}

module.exports ={LoginPage};