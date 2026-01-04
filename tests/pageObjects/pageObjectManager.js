const {LoginPage} = require("./DashBoardPage");
const {DashBoardPage} = require("./LoginPage");

class pageObjectManager {
    
    constructor(page) {
        this.page=page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
    }


    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardpage()
    {
        return this.dashboardPage;
    }
}

module.exports ={pageObjectManager};