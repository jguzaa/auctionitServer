const MongoClient = require('mongodb').MongoClient;
const MongoObjId = require('mongodb').ObjectId;
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


exports.addAuction = function (req) {

    return new Promise((resolve, reject) => {

        //console.log(req)

        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            //convert data to json from for database submitting
            let json = { "name": req.body.pname, "description": req.body.pdes, "price": req.body.pprice, "date": req.body.pdate, "photouri": req.body.pphotouri, "uid": req.body.puid, "status": true, "buyerid": '' };

            collection.insertOne(json, function (err, result) {

                //client.close();

                console.log(result.insertedId);

                resolve(result.insertedId);

            });


        });
    });

}

exports.auctionList = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            //fetch every auction from db
            collection.find({}).toArray(function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result);
                    resolve(result);
                } else {
                    console.log(result);
                    resolve("notFound");
                    reject(err);
                }

            });

        });
    });

}

exports.auctionSelect = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            //fetch specific auction from db by auction id
            collection.find(MongoObjId(req.body.item_id)).toArray(function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result);
                    resolve(result[0]);
                } else {
                    console.log(result);
                    resolve("notFound");
                    reject(err);
                }

            });

        });
    });

}

exports.doAuction = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            //set up query with auction id
            let myquery = { _id: MongoObjId(req.body.item_id) };

            //set up query with updated price
            let newvalues = { $set: { price: req.body.price, buyerid: req.body.buyer_id} };
            
            //do database update
            collection.updateOne(myquery, newvalues, function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result);
                    resolve(result[0]);
                } else {
                    console.log(result);
                    resolve("incomplete");
                    reject(err);
                }

            });

        });
    });

}




