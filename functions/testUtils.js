const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const stringToRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

const setTestEnv = async () => {
  process.env.PRIMARY_USER_EMAIL = "primary@example.com";
};

const setTestData = async (db, auth) => {
  const ts = new Date();
  const createdAt = ts;
  const updatedAt = ts;

  await db.collection("service").doc("conf").update({
    uiVersion: "for test",
    updatedAt: new Date(),
  });

  const priUid = (
    await db.collection("accounts").where(
        "user",
        "==",
        (
          await db.collection("users").doc(
              (
                await db.collection("groups").doc("admins").get()
              ).data().users[0],
          ).get()
        ).id,
    ).get()
  ).docs[0].id;

  const user01Doc = await db.collection("users").add({
    name: "User 01",
    createdAt,
    updatedAt,
  });

  const account01Doc = await db.collection("accounts").add({
    user: user01Doc.id,
    email: "user01@example.com",
    createdAt,
    updatedAt,
  });

  await db.collection("groups").doc("group01").set({
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

  console.info(`Set password to primary account: ${priUid}`);

  await auth.updateUser(
      account01Doc.id,
      {
        password: "password",
      },
  );

  console.info(`Set password to user01 account: ${account01Doc.id}`);
};

module.exports = {
  setTestEnv,
  stringToRegex,
  setTestData,
};
