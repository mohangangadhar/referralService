const {readFileSync} = require('fs');
var sqlSchema = readFileSync('app/data/product-schema.sql').toString();
//var productSqlSchema = readFileSync('app/data/order-schema.sql').toString();

module.exports = function(db) {
    db.serialize(function() {
//        db.run(orderSqlSchema);
        db.run(sqlSchema);
    });
};


