const axios = require("axios");
const logger = require("firebase-functions/logger");

/**
 * Restore deleted doc.
 * @param {object} event Firestore event
 */
async function restoreTriggerDoc(event) {
  const verRef = event.data.ref;
  await verRef.set({createdAt: new Date()});
  logger.info(`restored doc ${verRef.path}`);
}

/**
 * Upgrade system on deployment.
 * @param {object} db Firestore
 */
async function upgradeData(db) {
  const confRef = db.collection("service").doc("conf");
  const confDoc = await confRef.get();
  const currentVersion = confDoc.exists ? confDoc.data().dataVersion : 0;
  logger.info(`current data version: ${currentVersion}.`);

  const ts = new Date();
  const createdAt = ts;
  const updatedAt = ts;

  if (!confDoc.exists) {
    await confRef.set({
      dataVersion: 0,
      uiVersion: "",
      createdAt,
      updatedAt,
    });
  }

  const dataVersion = 1;

  if (currentVersion === dataVersion) {
    logger.info("Skip to upgrade data.");
    return;
  }

  if (currentVersion === 0) {
    logger.info("upgrade data 0 to 1.");

    const adminRef = db.collection("groups").doc("admins");
    const adminDoc = await adminRef.get();

    if (!adminDoc.exists) {
      const userDoc = await db.collection("users").add({
        name: "Primary user",
        createdAt,
        updatedAt,
      });

      await db.collection("accounts").add({
        user: userDoc.id,
        email: process.env.PRIMARY_USER_EMAIL,
        createdAt,
        updatedAt,
      });

      await adminRef.set({
        name: "Administrators",
        users: [userDoc.id],
        createdAt,
        updatedAt,
      });
    }
  }

  logger.info(`set data version: ${dataVersion}.`);
  await confRef.update({
    dataVersion,
    createdAt,
    updatedAt,
  });
}

/**
 * Set UI version.
 * @param {object} event Firestore event
 * @param {object} db Firestore
 */
async function setUiVersion(event, db) {
  const ts = new Date();
  const url = `https://${event.project}.web.app/version.json`;
  const params = `check=${ts.getTime()}`;
  const res = await axios.get(`${url}?${params}`);
  const {version} = res.data;
  logger.info(`get new UI version: ${version}`);

  const confRef = db.collection("service").doc("conf");
  const confDoc = await confRef.get();

  if (confDoc.data().uiVersion === version) return;

  await confRef.update({
    uiVersion: version,
    updatedAt: ts,
  });
  logger.info(`updated ${confRef.path}.uiVersion: ${version}`);
}

module.exports = {
  restoreTriggerDoc,
  upgradeData,
  setUiVersion,
};
