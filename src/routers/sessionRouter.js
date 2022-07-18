const express = require("express");
const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");

const sessionsRouter = express.Router();

sessionsRouter.route("/").get((req, res) => {
  const url = "mongodb://localhost:27017";
  const dbName = "expressDb";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);

      debug("Connected to the mongo DB");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();

      res.render("sessions", { sessions });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;

  const url = "mongodb://localhost:27017";
  const dbName = "expressDb";
  const myId= ObjectId(id);
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
    
      console.log(client);
      debug("Connected to the mongo DB");

      const db = client.db(dbName);
      const session = await db
        .collection('sessions')
        .findOne({ _id: myId });
        
      res.render('session', {
        session,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionsRouter;
