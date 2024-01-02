
const stringToRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

const setTestData = async (db) => {
  await db.collection("service").doc("conf").update({
    uiVersion: "for test",
    updatedAt: new Date(),
  });
};

module.exports = {
  stringToRegex,
  setTestData,
};
