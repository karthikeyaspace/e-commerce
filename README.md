### E-commerce api

#### Features: 
Create/Update/Get user \
Create/Update/Get product \
Create/Update/Get orders \
Get the order details for orders placed in the last n days. \
Get orders of a specific user \
Get users who bought a specific product \
Get total stock quantity for all products combined \
Decrement stock quantity of a product when an order is placed/updated 

#### End points:
#### User api

1. POST /user/
```
   {
    name: string,
    email: string,
    phoneNumber: string,
   }
```
2. GET /user/:id
3. PUT /user/
```
   {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
   }
```

#### Product api

1. POST /product/
```
   {
    name: string,
    category: string,
    price: number,
    stock: number,
   }
```
2. GET /product/:id
3. PUT /product/
```
   {
    id: string,
    name: string,
    category: string,
    price: number,
    stock: number,
   }
```
4. GET /product/stock/all-products


#### Order api

1. POST /order/
```
   {
    userId: string,
    productId: string,
    quantity: number,
   }
```
2. GET /order/:id
3. PUT /order/
```
   {
    id: string,
    userId: string,
    productId: string,
    quantity: number,
   }
```
4. GET /order/recent/:days
5. GET /order/user/:userId
6. GET /order/product/:productId

