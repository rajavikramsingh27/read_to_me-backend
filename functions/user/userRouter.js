
// const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();
require("../index")
// admin.initializeApp();

const collectionUser = admin.firestore().collection("users");

router.post("/create", (request, response) => {
  if (request.method == "POST") {
    collectionUser.add(request.body).then((value) => {
      const strID = value.id;
      collectionUser.doc(strID).update({
        "id": strID,
      }).then((value) => {
        response.status(200).json({
          "message": "Created Sucessfully.",
          "data": value.doc.data(),
        });
      });
    }).catch((error) => {
      response.status(500).json({"message": error});
    });
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});


router.get("/all", (request, response) => {
  if (request.method == "GET") {
    const arrUserDocData = [];
    collectionUser.get().then((querySnapshot) => {
      querySnapshot.forEach((userDoc) => {
        arrUserDocData.push(userDoc.data());
      });
      response.json(arrUserDocData);
    });
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE GET."});
  }
});


router.post("/", (request, response) => {
  if (request.method == "POST") {
    collectionUser.where("id", "==", request.body.id)
        .get().then((snapshot) => {
          snapshot.forEach((document) => {
            response.json(document.data());
          });
        }).catch((error) => {
          response.json(error);
        });
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

router.put("/", (request, response) => {
  if (request.method == "PUT") {
    collectionUser.doc(request.body.id).update(
        request.body
    ).then((value) => {
      response.json({
        "message": "Updated successfully.",
        "data": request.body,
      });
    });
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE PUT."});
  }
});


router.delete("/", (request, response) => {
  if (request.method == "DELETE") {
    collectionUser.doc(request.body.id).delete();
    response.json({"message": "Deleted Successfully."});
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE DELETE."});
  }
});


module.exports = router;

