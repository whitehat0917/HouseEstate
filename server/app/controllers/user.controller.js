var UserModel = require('../models/user.model');
var HouseModel = require('../models/house.model');
const request = require("request");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.getDashboardData = (req, res) => {
    var responseData = {};
    res.status(200).send({ status: "success", data: responseData });
    return;
    // history = new HistoryModel();
    // history.query("select IFNULL(sum(amount), 0) as amount from history", function(err, rows, fields) {
    //     if (rows.length == 0) {
    //         return res.status(200).send({ status: "error" });
    //     } else {
    //         responseData.total_price = rows[0].amount;
    //         history.query('select sum(amount) amount, DATE_FORMAT(created_at,"%b") month from history where DATE_FORMAT(created_at,"%Y") = DATE_FORMAT(NOW(),"%Y") group by DATE_FORMAT(created_at, "%b") order by DATE_FORMAT(created_at, "%m")', function(err, rows, fields) {
    //             if (err) {
    //                 return res.status(200).send({ status: "error" });
    //             } else {
    //                 responseData.price_list = rows;

    //                 const url = "http://161.35.121.255/api/users/getDashboardData";
    //                 request.post(url, (error, response, body) => {
    //                     if (error != null) {
    //                         res.status(200).send({ status: "error" });
    //                         return;
    //                     }
    //                     if (JSON.parse(body).status == "No error") {
    //                         const data = JSON.parse(body).data;
    //                         responseData.proxy_count = data.proxy_count;
    //                         responseData.user_count = data.user_count;
    //                         responseData.ip_count = data.ip_count;
    //                     } else {
    //                         responseData.proxy_count = 0;
    //                         responseData.user_count = 0;
    //                         responseData.ip_count = 0;
    //                     }
    //                     res.status(200).send({ status: "success", data: responseData });
    //                     return;
    //                 });
    //             }
    //         });
    //     }
    // });
};

exports.getHouseLength = (req, res) => {
    house = new HouseModel();
    house.find('all', function(err, rows) {
        if (err) {
            return res.status(200).send({ status: "Database Error" });
        } else {
            return res.status(200).send({ status: "success", data: rows.length });
        }
    });
};

exports.getHouses = (req, res) => {
    house = new HouseModel();
    house.find('all', { limit: [req.body.page * 12, 12] }, function(err, rows) {
        if (err) {
            return res.status(200).send({ status: "Database Error" });
        } else {
            return res.status(200).send({ status: "success", data: rows });
        }
    });
};