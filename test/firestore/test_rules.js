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
    "to read accounts",
    getDocs(collection(db, "accounts")),
  );
  await expect.denied(
    "to add doc to accounts",
    addDoc(collection(db, "accounts"), { name: "new account" }),
  );
  await expect.denied(
    "to read users",
    getDocs(collection(db, "users")),
  );
  await expect.denied(
    "to add doc to users",
    addDoc(collection(db, "users"), { name: "new user" }),
  );
  await expect.denied(
    "to read groups/admins",
    getDoc(doc(db, "groups", "admins")),
  );
  await expect.denied(
    "to update groups/admins",
    updateDoc(doc(db, "groups", "admins"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete groups/admins",
    deleteDoc(doc(db, "groups", "admins")),
  );
  await expect.denied(
    "to read groups/group01",
    getDoc(doc(db, "groups", "group01")),
  );
  await expect.denied(
    "to update groups/group01",
    updateDoc(doc(db, "groups", "group01"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete groups/group01",
    deleteDoc(doc(db, "groups", "group01")),
  );
  await expect.denied(
    "to add doc to groups",
    addDoc(collection(db, "groups"), { name: "new group" }),
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
    "to read accounts",
    getDocs(collection(db, "accounts")),
  );
  await expect.denied(
    "to add doc to accounts",
    addDoc(collection(db, "accounts"), { name: "new account" }),
  );
  await expect.allowed(
    "to read accounts/uid",
    getDoc(doc(db, "accounts", uid)),
  );
  const user01 = (await getDoc(doc(db, "accounts", uid))).data().user;
  await expect.allowed(
    "to update accounts/uid",
    updateDoc(doc(db, "accounts", uid), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete accounts/uid",
    deleteDoc(doc(db, "accounts", uid)),
  );
  await expect.allowed(
    "to read users",
    getDocs(collection(db, "users")),
  );
  await expect.denied(
    "to add doc to users",
    addDoc(collection(db, "users"), { name: "new user" }),
  );
  await expect.allowed(
    "to update users/user01",
    updateDoc(doc(db, "users", user01), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete users/user01",
    deleteDoc(doc(db, "users", user01)),
  );
  await expect.allowed(
    "to read groups/admins",
    getDoc(doc(db, "groups", "admins")),
  );
  await expect.denied(
    "to update groups/admins",
    updateDoc(doc(db, "groups", "admins"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete groups/admins",
    deleteDoc(doc(db, "groups", "admins")),
  );
  await expect.allowed(
    "to read groups/group01",
    getDoc(doc(db, "groups", "group01")),
  );
  await expect.denied(
    "to update groups/group01",
    updateDoc(doc(db, "groups", "group01"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete groups/group01",
    deleteDoc(doc(db, "groups", "group01")),
  );
  await expect.denied(
    "to add doc to groups",
    addDoc(collection(db, "groups"), { name: "new group" }),
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
    "to read accounts",
    getDocs(collection(db, "accounts")),
  );
  await expect.allowed(
    "to update accounts/uid",
    updateDoc(doc(db, "accounts", uid), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete accounts/uid",
    deleteDoc(doc(db, "accounts", uid)),
  );
  await expect.allowed(
    "to update accounts/user01",
    updateDoc(doc(db, "accounts", account01), { updatedAt: new Date() }),
  );
  await expect.allowed(
    "to delete accounts/user01",
    deleteDoc(doc(db, "accounts", account01)),
  );
  await expect.allowed(
    "to add doc to accounts",
    addDoc(collection(db, "accounts"), { name: "new account" }),
  );
  await expect.allowed(
    "to read users",
    getDocs(collection(db, "users")),
  );
  await expect.allowed(
    "to add doc to users",
    addDoc(collection(db, "users"), { name: "new user" }),
  );
  const admin = (await getDoc(doc(db, "accounts", uid))).data().user;
  await expect.allowed(
    "to update users/user01",
    updateDoc(doc(db, "users", user01), { updatedAt: new Date() }),
  );
  await expect.allowed(
    "to delete users/user01",
    deleteDoc(doc(db, "users", user01)),
  );
  await expect.allowed(
    "to update users/admin",
    updateDoc(doc(db, "users", admin), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete users/admin",
    deleteDoc(doc(db, "users", admin)),
  );
  await expect.allowed(
    "to read groups/admins",
    getDoc(doc(db, "groups", "admins")),
  );
  await expect.allowed(
    "to update groups/admins",
    updateDoc(doc(db, "groups", "admins"), { updatedAt: new Date() }),
  );
  await expect.denied(
    "to delete groups/admins",
    deleteDoc(doc(db, "groups", "admins")),
  );
  await expect.allowed(
    "to read groups/group01",
    getDoc(doc(db, "groups", "group01")),
  );
  await expect.allowed(
    "to update groups/group01",
    updateDoc(doc(db, "groups", "group01"), { updatedAt: new Date() }),
  );
  await expect.allowed(
    "to delete groups/group01",
    deleteDoc(doc(db, "groups", "group01")),
  );
  await expect.allowed(
    "to add doc to groups",
    addDoc(collection(db, "groups"), { name: "new group" }),
  );

  await signOut(auth);  
  console.info(" Sing-out");

  process.exit(expect.getResult());
})();
