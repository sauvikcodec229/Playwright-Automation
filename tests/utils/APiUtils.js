class APiUtils  //Here also just like JAVA, fle name and class name should match
{
    constructor(apiContext,loginPayload)
    {
       //WE create a class instance whose scope is in the entire class. So the getToken() will use that instance variabel
       this.apiContext = apiContext; //this.apiContext is the instance variable
       this.loginPayload=loginPayload;
    }

    async getToken()
    {
           const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
              data:this.loginPayload,
            } );//200, 201...these will make sure our request is  a success
        
          
           const loginResponseJSON = await loginResponse.json();
           const token = loginResponseJSON.token;
           console.log(token);
           return token;
        
           //this storage of token may differ from app to app, in some it can be stored in local storage,
          //  sometimes in session storage or sometimes in cookies
    }

    async createOrder(orderPayload)
    {
        let response = {}; 
        response.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
              data:orderPayload,
              headers:{
                'Authorization':response.token,
                'Content-Type':'application/json'
              },
              
            } );//200, 201...these will make sure our request is  a success
        
           const createOrderResponseJSON = await createOrderResponse.json();
           console.log(createOrderResponse);

           const orderID = createOrderResponseJSON.orders[0];
           console.log(orderID);
           
           response.orderID=orderID;
           return response;
    }

}
module.exports ={APiUtils};