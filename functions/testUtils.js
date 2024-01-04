
const stringToRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

const setTestEnv = async () => {
  process.env.PRIMARY_USER_EMAIL = "primary@example.com";
};

const setTestData = async (db) => {
  await db.collection("service").doc("conf").update({
    uiVersion: "for test",
    updatedAt: new Date(),
  });
};

module.exports = {
  setTestEnv,
  stringToRegex,
  setTestData,
};
