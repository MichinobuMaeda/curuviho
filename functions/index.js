const {setGlobalOptions} = require("firebase-functions/v2");
const {onCall} = require("firebase-functions/v2/https");
const {
  onDocumentDeleted,
} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getAuth} = require("firebase-admin/auth");
const {
  restoreTriggerDoc,
  upgradeData,
  setUiVersion,
} = require("./deployment");
const {
  setTestData,
} = require("./testUtils");

setGlobalOptions({region: "asia-northeast2"});

initializeApp();

exports.onDeletedDeployment = onDocumentDeleted(
    "service/deployment",
    async (event) => {
      const db = getFirestore();
      const auth = getAuth();
      await restoreTriggerDoc(event);
      await upgradeData(db, auth);
      await setUiVersion(event, db);
    },
);

exports.generateTestData = onCall(
    async (_) => {
      if (process.env.NODE_ENV !== "test") return;
      const db = getFirestore();
      const auth = getAuth();
      await upgradeData(db, auth);
      await setTestData(db, auth);
    },
);
