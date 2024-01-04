const crypto = require("node:crypto");
const logger = require("firebase-functions/logger");

/**
 * Create account from doc.
 * @param {object} auth Firebase Authentication.
 * @param {object} doc Account attributes.
 */
async function createUser(auth, doc) {
  const userProps = {
    uid: doc.id,
    disabled: !!doc.data().deletedAt,
  };

  if (doc.data().email) {
    userProps.email = doc.data().email;
    userProps.password = crypto.randomBytes(20).toString("base64");
  }

  await auth.createUser(userProps);
  logger.info(`create user: ${userProps.uid}`);
}

/**
 * Create account from doc.
 * @param {object} auth Firebase Authentication.
 * @param {object} change Account attributes.
 */
async function updateUser(auth, {before, after}) {
  const uid = after.id;
  const userProps = {};

  if ((!!before.data().deletedAt) !== (!!after.data().deletedAt)) {
    userProps.disabled = !!after.data().deletedAt;
  }

  if (before.data().email !== after.data().email && after.data().email) {
    userProps.email = after.data().email;
  }

  if (Object.keys(userProps).length === 0) {
    logger.warn(`skip update user: ${uid}`);
    return;
  }

  await auth.updateUser(uid, userProps);
  logger.info(`update user: ${uid} with props: ${JSON.stringify(userProps)}`);
}

module.exports = {
  createUser,
  updateUser,
};
