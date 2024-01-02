const {setGlobalOptions} = require("firebase-functions/v2");
const {
//   onDocumentCreated,
//   onDocumentUpdated,
  onDocumentDeleted,
} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {
  restoreTriggerDoc,
  upgradeData,
  setUiVersion,
} = require("./upgrade");
const {setTestData} = require("./testUtils");

setGlobalOptions({region: "asia-northeast1"});

initializeApp();

exports.onDeletedUpgrade = onDocumentDeleted(
    "service/upgrade",
    async (event) => {
      const db = getFirestore();
      await restoreTriggerDoc(event);
      await upgradeData(db);
      await setUiVersion(event, db);
    },
);

exports.onDeletedTest = onDocumentDeleted(
    "service/test",
    async (_) => {
      logger.info(process.env.NODE_ENV);
      if (process.env.NODE_ENV !== "test") return;
      await upgradeData(getFirestore());
      await setTestData(getFirestore());
    },
);
