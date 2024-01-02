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
  let currentVersion = confDoc.exists ? confDoc.data().dataVersion : 0;
  logger.info(`current data version: ${currentVersion}.`);
  const ts = new Date();
  const createdAt = ts;
  const updatedAt = ts;

  if (!confDoc.exists) {
    currentVersion = 1;
    await confRef.set({
      dataVersion: currentVersion,
      uiVersion: "",
      createdAt,
      updatedAt,
    });
  }

  const dataVersion = 1;
  logger.info(`latest data version: ${dataVersion}.`);

  if (currentVersion === dataVersion) return;

  // Do something.
  //
  // await confRef.update({dataVersion, updatedAt});
  // logger.info(`set data version: ${dataVersion}`);
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
