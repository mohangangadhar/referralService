CREATE TABLE IF NOT EXISTS Product
( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    orderId INT NOT NULL , 
    order_status TEXT NOT NULL,
    product_status TEXT NOT NULL , 
    product TEXT NOT NULL,
    name TEXT NOT NULL , 
    phone TEXT NOT NULL , 
    amount INT NOT NULL , 
    incentive INT NOT NULL,
    refferal TEXT NULL DEFAULT ""
);