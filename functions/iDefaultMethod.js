const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();
const appPost = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


admin.initializeApp();
appPost.use(bodyParser.urlencoded);
appPost.use(cors({origin: true}));

const collectionUser = admin.firestore().collection("userList");

app.post("/", (request, response) => {
  collectionUser.add(request.body).then((value) => {
    const strID = value.id;
    collectionUser.doc(strID).update({
      "id": strID,
    });
    response.status(200).json({"message": "Created Sucessfully."});
  }).catch((error) => {
    response.status(500).json({"message": error});
  });
});


app.get("/", (request, response) => {
  const arrUserDocData = [];
  collectionUser.get().then((querySnapshot) => {
    querySnapshot.forEach((userDoc) => {
      arrUserDocData.push(userDoc.data());
    });
    response.json(arrUserDocData);
  });
});


app.get("/:id", (request, response) => {
  collectionUser.where("id", "==", request.params.id)
      .get().then((snapshot) => {
        snapshot.forEach((document) => {
          response.json(document.data());
        });
      }).catch((error) => {
        response.json(error);
      });
});

// app.get("/:id", (request, response) => {
//   if (request.method !== "POST") {
//     response.send(405, "HTTP Method " +request.method+" not allowed");
//   } else {
//     let dictDocData;
//     collectionUser.where("id", "==", request.body.id)
//         .get().then((snapshot) => {
//           snapshot.forEach((document) => {
//             dictDocData = document.data();
//             response.json(document.data());
//           });
//           if (dictDocData == null || dictDocData === null) {
//             response.json({});
//           }
//         }).catch((error) => {
//           response.json(error);
//         });
//   }
// });

app.put("/:id", (request, response) => {
  collectionUser.doc(request.params.id).update(
      request.body
  ).then((value) => {
    response.status(200).json({"message": "Updated successfully."});
  });
});


app.delete("/:id", (request, response) => {
  collectionUser.doc(request.params.id).delete();
  response.status(200).json({"message": "Deleted Successfully."});
});


appPost.post("/", (request, response) => {
  if (request.method !== "POST") {
    response.send(405, "HTTP Method " +request.method+" not allowed");
  } else {
    let dictDocData;
    collectionUser.where("id", "==", request.body.id)
        .get().then((snapshot) => {
          snapshot.forEach((document) => {
            dictDocData = document.data();
            response.json(document.data());
          });
          if (dictDocData == null || dictDocData === null) {
            response.json({});
          }
        }).catch((error) => {
          response.json(error);
        });
  }
});

// exports.user = functions.https.onRequest(app);
exports.userPost = functions.https.onRequest(appPost);

// exports.userPost = functions.https.onRequest((request, response) => {
//   if (request.method !== "POST") {
//     response.send(405, "HTTP Method " +request.method+" not allowed");
//   } else {
//     let dictDocData;
//     collectionUser.where("id", "==", request.body.id)
//         .get().then((snapshot) => {
//           snapshot.forEach((document) => {
//             dictDocData = document.data();
//             response.json(document.data());
//           });
//           if (dictDocData == null || dictDocData === null) {
//             response.json({});
//           }
//         }).catch((error) => {
//           response.json(error);
//         });
//   }

//   // response.send(request.body);
// });


