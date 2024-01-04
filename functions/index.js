const {setGlobalOptions} = require("firebase-functions/v2");
const {onCall} = require("firebase-functions/v2/https");
const {
  onDocumentCreated,
  onDocumentUpdated,
  onDocumentDeleted,
} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getAuth} = require("firebase-admin/auth");
const {
  createUser,
  updateUser,
} = require("./accounts");
const {
  restoreTriggerDoc,
  upgradeData,
  setUiVersion,
} = require("./deployment");
const {
  setTestEnv,
  setTestData,
} = require("./testUtils");

setGlobalOptions({region: "asia-northeast2"});

initializeApp();

exports.onCreateAccount = onDocumentCreated(
    "accounts/{account}",
    (event) => createUser(getAuth(), event.data),
);

exports.onUpdateAccount = onDocumentUpdated(
    "accounts/{account}",
    (event) => updateUser(getAuth(), event.data),
);

exports.onDeletedDeployment = onDocumentDeleted(
    "service/deployment",
    async (event) => {
      const db = getFirestore();
      await restoreTriggerDoc(event);
      await upgradeData(db);
      await setUiVersion(event, db);
    },
);

exports.generateTestData = onCall(
    async (_) => {
      if (process.env.NODE_ENV !== "test") return;
      const db = getFirestore();
      setTestEnv();
      await upgradeData(db);
      await setTestData(db);
    },
);
