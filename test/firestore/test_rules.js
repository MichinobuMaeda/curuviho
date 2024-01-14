const { initializeApp } = require("firebase/app");
const {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const {
    getFirestore,
    connectFirestoreEmulator,
    collection,
    query,
    where,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} = require("firebase/firestore");

const {
  firebase_options,
  auth_host,
  auth_port,
  firestore_host,
  firestore_port,
} = require("./test_config");
const { Expect } = require("./expect");

(async () => {
  initializeApp(firebase_options);
  const auth = getAuth();
  connectAuthEmulator(auth, `http://${auth_host}:${auth_port}`);
  const db = getFirestore();
  connectFirestoreEmulator(db, firestore_host, firestore_port);

  const expect = new Expect();

  console.info("----- Before Sing-in -----");
  let uid = auth.currentUser?.uid ?? null;
  console.info(` uid: ${uid}`);
  
  await expect.allowed(
    "to read service/conf",
    getDoc(doc(db, "service", "conf")),
  );
  await expect.denied(
    "to update service/conf",
    updateDoc(doc(db, "service", "conf"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete service/conf",
    deleteDoc(doc(db, "service", "conf")),
  );  
  await expect.denied(
    "to read service/admins",
    getDoc(doc(db, "service", "admins")),
  );
  await expect.denied(
    "to update service/admins",
    updateDoc(doc(db, "service", "admins"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete service/admins",
    deleteDoc(doc(db, "service", "admins")),
  );
  await expect.denied(
    "to read orgs/test/accounts",
    getDocs(collection(db, "orgs", "test", "accounts")),
  );
  await expect.denied(
    "to add doc to orgs/test/accounts",
    addDoc(collection(db, "orgs", "test", "accounts"), { name: "new account" }),
  );
  await expect.denied(
    "to read orgs/test/users",
    getDocs(collection(db, "orgs", "test", "users")),
  );
  await expect.denied(
    "to add doc to orgs/test/users",
    addDoc(collection(db, "orgs", "test", "users"), { name: "new user" }),
  );
  await expect.denied(
    "to read orgs/test/groups/managers",
    getDoc(doc(db, "orgs", "test", "groups", "managers")),
  );
  await expect.denied(
    "to update orgs/test/groups/managers",
    updateDoc(doc(db, "orgs", "test", "groups", "managers"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/groups/managers",
    deleteDoc(doc(db, "orgs", "test", "groups", "managers")),
  );
  await expect.denied(
    "to read orgs/test/groups/group01",
    getDoc(doc(db, "orgs", "test", "groups", "group01")),
  );
  await expect.denied(
    "to update orgs/test/groups/group01",
    updateDoc(doc(db, "orgs", "test", "groups", "group01"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/groups/group01",
    deleteDoc(doc(db, "orgs", "test", "groups", "group01")),
  );
  await expect.denied(
    "to add doc to orgs/test/groups",
    addDoc(collection(db, "orgs", "test", "groups"), { name: "new group" }),
  );

  await signInWithEmailAndPassword(auth, "user01@example.com", "password");  
  console.info("----- Sing-in as User 01 -----");
  uid = auth.currentUser.uid;
  console.info(` uid: ${uid}`);

  await expect.allowed(
    "to read service/conf",
    getDoc(doc(db, "service", "conf")),
  );
  await expect.denied(
    "to update service/conf",
    updateDoc(doc(db, "service", "conf"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete service/conf",
    deleteDoc(doc(db, "service", "conf")),
  );
  await expect.denied(
    "to read service/admins",
    getDoc(doc(db, "service", "admins")),
  );
  await expect.denied(
    "to update service/admins",
    updateDoc(doc(db, "service", "admins"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete service/admins",
    deleteDoc(doc(db, "service", "admins")),
  );
  await expect.denied(
    "to read orgs/test/accounts",
    getDocs(collection(db, "orgs", "test", "accounts")),
  );
  await expect.denied(
    "to add doc to orgs/test/accounts",
    addDoc(collection(db, "orgs", "test", "accounts"), { name: "new account" }),
  );
  await expect.allowed(
    "to read orgs/test/accounts/uid",
    getDoc(doc(db, "orgs", "test", "accounts", uid)),
  );
  const user01 = (await getDoc(doc(db, "orgs", "test", "accounts", uid))).data().user;
  await expect.allowed(
    "to update orgs/test/accounts/uid",
    updateDoc(doc(db, "orgs", "test", "accounts", uid), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/accounts/uid",
    deleteDoc(doc(db, "orgs", "test", "accounts", uid)),
  );
  await expect.allowed(
    "to read orgs/test/users",
    getDocs(collection(db, "orgs", "test", "users")),
  );
  await expect.denied(
    "to add doc to orgs/test/users",
    addDoc(collection(db, "orgs", "test", "users"), { name: "new user" }),
  );
  await expect.allowed(
    "to update orgs/test/users/user01",
    updateDoc(doc(db, "orgs", "test", "users", user01), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/users/user01",
    deleteDoc(doc(db, "orgs", "test", "users", user01)),
  );
  await expect.allowed(
    "to read orgs/test/groups/managers",
    getDoc(doc(db, "orgs", "test", "groups", "managers")),
  );
  await expect.denied(
    "to update orgs/test/groups/managers",
    updateDoc(doc(db, "orgs", "test", "groups", "managers"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/groups/managers",
    deleteDoc(doc(db, "orgs", "test", "groups", "managers")),
  );
  await expect.allowed(
    "to read orgs/test/groups/group01",
    getDoc(doc(db, "orgs", "test", "groups", "group01")),
  );
  await expect.denied(
    "to update orgs/test/groups/group01",
    updateDoc(doc(db, "orgs", "test", "groups", "group01"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/groups/group01",
    deleteDoc(doc(db, "orgs", "test", "groups", "group01")),
  );
  await expect.denied(
    "to add doc to orgs/test/groups",
    addDoc(collection(db, "orgs", "test", "groups"), { name: "new group" }),
  );

  await signOut(auth);  
  console.info(" Sing-out");
  
  await signInWithEmailAndPassword(auth, "primary@example.com", "password");  
  console.info("----- Sing-in as Primary User -----");
  const account01 = uid;
  uid = auth.currentUser.uid;
  console.info(` uid: ${uid}`);

  await expect.allowed(
    "to read service/conf",
    getDoc(doc(db, "service", "conf")),
  );
  await expect.allowed(
    "to update service/conf",
    updateDoc(doc(db, "service", "conf"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete service/conf",
    deleteDoc(doc(db, "service", "conf")),
  );
  await expect.allowed(
    "to read service/admins",
    getDoc(doc(db, "service", "admins")),
  );
  await expect.allowed(
    "to update service/admins",
    updateDoc(doc(db, "service", "admins"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete service/admins",
    deleteDoc(doc(db, "service", "admins")),
  );
  await expect.allowed(
    "to read orgs/test/accounts",
    getDocs(collection(db, "orgs", "test", "accounts")),
  );
  await expect.allowed(
    "to update orgs/test/accounts/uid",
    updateDoc(doc(db, "orgs", "test", "accounts", uid), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/accounts/uid",
    deleteDoc(doc(db, "orgs", "test", "accounts", uid)),
  );
  await expect.allowed(
    "to update orgs/test/accounts/user01",
    updateDoc(doc(db, "orgs", "test", "accounts", account01), { updatedAt: new Date() }),
  );
  await expect.allowed(
    "to delete orgs/test/accounts/user01",
    deleteDoc(doc(db, "orgs", "test", "accounts", account01)),
  );
  await expect.allowed(
    "to add doc to orgs/test/accounts",
    addDoc(collection(db, "orgs", "test", "accounts"), { name: "new account" }),
  );
  await expect.allowed(
    "to read orgs/test/users",
    getDocs(collection(db, "orgs", "test", "users")),
  );
  await expect.allowed(
    "to add doc to orgs/test/users",
    addDoc(collection(db, "orgs", "test", "users"), { name: "new user" }),
  );
  const admin = (await getDoc(doc(db, "orgs", "test", "accounts", uid))).data().user;
  await expect.allowed(
    "to update orgs/test/users/user01",
    updateDoc(doc(db, "orgs", "test", "users", user01), { updatedAt: new Date() }),
  );
  await expect.allowed(
    "to delete orgs/test/users/user01",
    deleteDoc(doc(db, "orgs", "test", "users", user01)),
  );
  await expect.allowed(
    "to update orgs/test/users/admin",
    updateDoc(doc(db, "orgs", "test", "users", admin), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/users/admin",
    deleteDoc(doc(db, "orgs", "test", "users", admin)),
  );
  await expect.allowed(
    "to read orgs/test/groups/managers",
    getDoc(doc(db, "orgs", "test", "groups", "managers")),
  );
  await expect.allowed(
    "to update orgs/test/groups/managers",
    updateDoc(doc(db, "orgs", "test", "groups", "managers"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete orgs/test/groups/managers",
    deleteDoc(doc(db, "orgs", "test", "groups", "managers")),
  );
  await expect.allowed(
    "to read orgs/test/groups/group01",
    getDoc(doc(db, "orgs", "test", "groups", "group01")),
  );
  await expect.allowed(
    "to update orgs/test/groups/group01",
    updateDoc(doc(db, "orgs", "test", "groups", "group01"), { updatedAt: new Date() }),
  );
  await expect.allowed(
    "to delete orgs/test/groups/group01",
    deleteDoc(doc(db, "orgs", "test", "groups", "group01")),
  );
  await expect.allowed(
    "to add doc to orgs/test/groups",
    addDoc(collection(db, "orgs", "test", "groups"), { name: "new group" }),
  );

  await signOut(auth);  
  console.info(" Sing-out");

  process.exit(expect.getResult());
})();
