const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const stringToRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

const setTestData = async (db, auth) => {
  const ts = new Date();
  const createdAt = ts;
  const updatedAt = ts;

  const testRef = db.collection("orgs").doc("test");

  await db.collection("service").doc("conf").update({
    uiVersion: "for test",
    updatedAt: new Date(),
  });

  const priUid = (
    await db.collection("service").doc("admins").get()
  ).data().accounts[0];

  const user01Doc = await testRef.collection("users").add({
    name: "User 01",
    email: "user01@example.com",
    createdAt,
    updatedAt,
  });

  const account01Doc = await testRef.collection("accounts").add({
    user: user01Doc.id,
    createdAt,
    updatedAt,
  });

  await testRef.collection("groups").doc("group01").set({
    users: [user01Doc.id],
    createdAt,
    updatedAt,
  });

  await sleep(1000);

  await auth.updateUser(
      priUid,
      {
        password: "password",
      },
  );

  console.info(`Create account 01`);

  await auth.createUser(
      {
        uid: account01Doc.id,
        email: "user01@example.com",
        password: "password",
      },
  );
};

module.exports = {
  stringToRegex,
  setTestData,
};
