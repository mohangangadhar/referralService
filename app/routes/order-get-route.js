import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

module.exports = function (app, db) {
    const api = new WooCommerceRestApi({
        url: 'https://jeevamrut.in',
        consumerKey: "ck_70fad50db486863044471bdbfd674d2f835e3d65",
        consumerSecret: "cs_fb23afe243f12d7123594d0046592919a4726a40",
        version: "wc/v3",
        queryStringAuth: true,
    });
    app.get('/api/orders', (req, res) => {
        api.get("orders", {
            per_page: 100, // 20 products per page
        }).then((response) => {
            let map1 = response.data.map(x => {
                return {
                    "orderId": x.id,
                    "order_status": x.status,
                    "amount": x.total,
                    "name": x.billing.first_name + " " + x.billing.last_name,
                    "phone": x.billing.phone,
                    "incentive": x.total * 0.15,
                    "refferal": ""
                }
            });
            processProducts(map1,req,db);
            return res.send(map1);

        }).catch((error) => {
            // Invalid request, for 4xx and 5xx statuses
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
            console.log("Response Data:", error.response.data);
        }).finally(() => {
            // Always executed.
        });
    });

    function processProducts(req, res, db){
        for (var prod of req) {
            insertProduct(prod, res, db);
        }
    }    

    function insertProduct(product, res, db) {
        var orderId = product.orderId;
        var status = product.status;
        var name = product.name;
        var phone = product.phone;
        var amount = product.amount;
        var incentive = product.incentive;
        var refferal = product.refferal;

        var sql = `insert into Product (orderId, status, name, phone, amount, incentive, refferal) 
                VALUES 
                (?, ?, ?, ?, ?, ?, ?);`;

        var values = [orderId, status, name, phone, amount, incentive, refferal];

        db.serialize(function () {
            db.run(sql, values, function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).send(err);
                }
                else
                    console.log("success", values);
            });
        });
    }
}

