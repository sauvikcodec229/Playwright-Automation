const {LoginPage} = require("./LoginPage");
const {DashBoardPage} = require("./DashBoardPage");
const {CartPage} = require("./CartPage");
const {PaymentPage} = require("./PaymentPage");
const {OrderConfirmationPage} = require("./OrderConfirmationPage");
const {AllOrdersPage} = require("./AllOrdersPage");

class pageObjectManager {
    
    constructor(page) {
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.allOrdersPage = new AllOrdersPage(this.page);
    }


    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardpage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getPaymentPage()
    {
        return this.paymentPage;
    }

    getOrderConfirmationPage()
    {
       return this.orderConfirmationPage;
    }

    getAllOrdersPage()
    {
        return this.allOrdersPage;
    }
}

module.exports ={pageObjectManager};