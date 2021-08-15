const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp();

const collectionUsers = admin.firestore().collection("users");

// app.get("/users", (req, res) => {
//   console.log("Firebase connected");
// });

app.post("/create", (req, res) => {
  try {
    const user = req.body;
    collectionUsers.add(user)
        .then((doc) => {
          collectionUsers.doc(doc.id)
              .update({"id": doc.id})
              .then((doc) => {
                res.status(200).json({"message": "Created Successfully."});
              }).catch((error) => {
                res.status(500).json({"message": error.message});
              });
        }).catch((error) => {
          res.status(500).json({"message": error.message});
        });
  } catch (error) {
    res.status(200).json({"message": error.message});
  }
});

app.get("/all", (req, res) => {
  try {
    const users = [];
    collectionUsers.get()
        .then((value) => {
          const docs = value.docs;
          docs.forEach((element) => {
            users.push(element.data());
          });
          res.status(200).send(users);
        }).catch((error) => {
          res.status(500).json({"message": error.message});
        });
  } catch (error) {
    res.status(200).json({"message": error.message});
  }
});

app.post("/", (req, res) => {
  try {
    collectionUsers.doc(req.body.id).get()
        .then((value) => {
          const docs = value.data();
          res.status(200).send(docs);
        }).catch((error) => {
          res.status(500).json({"message": error.message});
        });
  } catch (error) {
    res.status(500).json({"message": error.message});
  }
});

app.put("/", (req, res) => {
  try {
    collectionUsers.doc(req.body.id).update(
        req.body
    );
    res.status(200).json({"message": "Updated Successfully."});
  } catch (error) {
    res.status(500).json({"message": error.message});
  }
});

app.delete("/", (req, res) => {
  try {
    collectionUsers.doc(req.body.id).delete();
    res.status(200).json({"message": "Deleted Successfully."});
  } catch (error) {
    res.status(500).json({"message": error.message});
  }
});

exports.user = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

