const {expect} = require('@playwright/test');

class PaymentPage {

    constructor(page) {
        this.page = page;
        this.selectCntry = this.page.locator("input[placeholder*='Country']");
        this.suggestionWndow = this.page.locator("section.ta-results");
        this.allSuggestions = this.page.locator("section[class*='ta-results'] span");
        this.shippingInfoEmail = this.page.locator(".user__name [type='text']");
        this.cvvInput = this.page.locator("div.form__cc div[class='title']:has-text('CVV Code ') + input");
        this.placeOrder = this.page.locator(".action__submit");
    }

    async selectCountryFromSuggestion(country) {

        let cntry = country.trim();
        await this.selectCntry.pressSequentially(cntry);
        await this.suggestionWndow.waitFor();

        for (let i = 0; i < await this.allSuggestions.count(); i++) {
            if (await this.allSuggestions.nth(i).textContent() === country)  //Now in this small window of options we need to choose India
            {
                await this.allSuggestions.nth(i).click();
                break;
            }
        }

        console.log("The selected country is : " + await this.page.locator("input[placeholder*='Country']").inputValue());
        await expect(this.page.locator("input[placeholder*='Country']")).toHaveValue(cntry);
    }

    async validateShippingInfoEmail(email) {
        await expect(this.shippingInfoEmail.nth(0)).toHaveText(email);
    }

    async enterCVV() {
        await this.cvvInput.fill("930");
    }

    async placeProductOrder() {
     await this.placeOrder.click();
    }

}

module.exports = { PaymentPage };

