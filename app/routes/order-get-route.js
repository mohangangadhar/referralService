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
        console.log(req.query);
        api.get("orders", req.query).then((response) => {
            let map1 = response.data.map(x => {
                return {
                    "orderId": x.id,
                    "order_status": x.status,
                    "amount": x.total,
                    "name": x.billing.first_name + " " + x.billing.last_name,
                    "phone": x.billing.phone,
                    "incentive": x.total * 0.075,
                    "refferal": ""
                }
            });
            processProducts(map1, req, db);
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

    app.get('/api/orders/:id', (req, res) => {
        console.log(req.query);
        console.log(req.params.id);
        api.get("orders/" + req.params.id, req.query).then((response) => {
            console.log(response.data);
            let map1 = {
                "orderId": response.data.id,
                "order_status": response.data.status,
                "amount": response.data.total,
                "name": response.data.billing.first_name + " " + response.data.billing.last_name,
                "phone": response.data.billing.phone,
                "incentive": response.data.total * 0.075,
                "refferal": ""
            }
            insertProduct(map1, req, db);
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
    function processProducts(req, res, db) {
        for (var prod of req) {
            insertProduct(prod, res, db);
        }
    }

    function insertProduct(product, res, db) {
        var orderId = product.orderId;
        var order_status = product.order_status;
        var name = product.name;
        var phone = product.phone;
        var amount = product.amount;
        var incentive = product.incentive;
        var refferal = product.refferal;

        var sql = `insert into OrderList (orderId, order_status, name, phone, amount, incentive, refferal) 
                VALUES 
                (?, ?, ?, ?, ?, ?, ?);`;

        var values = [orderId, order_status, name, phone, amount, incentive, refferal];

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

