CREATE TABLE IF NOT EXISTS Product
( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    orderId INT NOT NULL , 
    product_status TEXT NOT NULL , 
    product TEXT NOT NULL,
    incentive INT NOT NULL,
    order_poc TEXT NULL DEFAULT "",
    tracking_poc TEXT NULL DEFAULT "",
    payment_poc TEXT NULL DEFAULT "",
    feedback_poc TEXT NULL DEFAULT "",
    packed_by TEXT NULL DEFAULT "",
    qa_by TEXT NULL DEFAULT "",
    delivered_by TEXT NULL DEFAULT "",
    comments TEXT NULL DEFAULT "",
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP 
);