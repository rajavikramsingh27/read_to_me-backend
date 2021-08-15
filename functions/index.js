

const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const app = express();

admin.initializeApp();

const collectionUser = admin.firestore().collection("users");

app.post("/user/create", (request, response) => {
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



app.get("/user/all", (request, response) => {
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


app.post("/user", (request, response) => {
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

app.put("/user", (request, response) => {
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


app.delete("/user", (request, response) => {
  if (request.method == "DELETE") {
    collectionUser.doc(request.body.id).delete();
    response.json({"message": "Deleted Successfully."});
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE DELETE."});
  }
});

const collectionCourses = admin.firestore().collection("courses");

app.get("/course", (request, response) => {
  if (request.method == "GET") {
    try {
      const arrDocData = [];
      collectionCourses.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arrDocData.push(doc.data());
        });
        response.json(arrDocData);
      });
    } catch (error) {
      res.json({"message": error.message});
    }
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE GET."});
  }
});

const collectionLesson_type_list = admin.firestore().collection("lesson_type_list");

app.post("/course", (request, response) => {
  if (request.method == "POST") {
    const arrDocData = [];
    collectionLesson_type_list.where("difficulty", "==", request.body.difficulty)
        .get().then((snapshot) => {
          if (snapshot.docs.length == 0) {
            response.json([]);
          } else {
            snapshot.forEach((document) => {
              arrDocData.push(document.data());
            });              
            response.json(arrDocData);
          }
        }).catch((error) => {
          response.json(error);
        });
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});


const collectionBooks = admin.firestore().collection("books");


app.get("/books", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionBooks.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

const collectionList = admin.firestore().collection("collection");

app.get("/collection", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionList.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

app.post("/collection", (request, response) => {
  if (request.method == "POST") {
  try {
    const arrDocData = [];
    collectionBooks.where("collection", "==", request.body.collection).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

app.get("/short_story", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionBooks.where("short_story", "==", true).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

const collectionCategory = admin.firestore().collection("category");

app.get("/category", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionCategory.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

app.post("/category", (request, response) => {
  if (request.method == "POST") {
  try {
    const arrDocData = [];
    collectionBooks.where("category", "==", request.body.category).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

const collectionGeners = admin.firestore().collection("geners");

app.get("/geners", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionGeners.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

app.post("/geners", (request, response) => {
  if (request.method == "POST") {
  try {
    const arrDocData = [];
    collectionBooks.where("geners", "==", request.body.geners).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

const collectionDifficulty = admin.firestore().collection("difficulty");

app.get("/difficulty", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionDifficulty.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});

app.post("/difficulty", (request, response) => {
  if (request.method == "POST") {
  try {
    const arrDocData = [];
    collectionBooks.where("difficulty", "==", request.body.difficulty).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});


app.get("/favorite", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionBooks.where("favorite", "==", true).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});


app.get("/history", (request, response) => {
  if (request.method == "GET") {
  try {
    const arrDocData = [];
    collectionBooks.where("history", "==", true).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrDocData.push(doc.data());
      });
      response.json(arrDocData);
    });
} catch (error) {
  res.json({"message": error.message});
}
  } else {
    response.json({"message": "ERROR \nMETHOD MUST BE POST."});
  }
});


exports.api = functions.https.onRequest(app);

