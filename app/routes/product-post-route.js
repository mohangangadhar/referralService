module.exports = function (app, db) {
    
    // Add new product
    // http://localhost:4300/api/product
    // Sending a JSON body:
    // {
    //     "name": "ExampleProductName",
    //     "description": "Example product description",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of products:
    // [
    //     {...},{...}
    // ]
    app.post('/api/product/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

         var data = req.body;
         
         if((data.constructor === Array))
            processProducts(req, res, db);
         else
            processProduct(req, res, db);
    });
};

function processProducts(req, res, db){
    for (var prod of req.body) {
        insertProduct(prod, res, db);
    }
}

function processProduct(req, res, db){
    validateRequest(req, res);
    insertProduct(req.body, res, db);
}

function insertProduct(product, res, db){
    var orderId = product.orderId;
    var status = product.status;
    var name = product.name;
    var phone = product.phone;
    var amount = product.amount;
    var incentive = product.incentive;
    var refferal = product.refferal;

    var sql = `insert into OrderList (orderId, status, name, phone, amount, incentive, refferal) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?);`;

    var values = [orderId, status, name, phone, amount, incentive, refferal];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            }
                
            else
                res.send();
        });
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/order-schema.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });

    if (req.body.id) {
        res.status(400).send("ID cannot be submmited");
    }
}

