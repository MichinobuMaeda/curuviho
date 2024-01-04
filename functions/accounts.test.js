const functionsTest = require("firebase-functions-test")();
const logger = require("firebase-functions/logger");
const auth = require("firebase-admin/auth");
const {
  createUser,
  updateUser,
} = require("./accounts");

jest.mock("firebase-functions/logger");
jest.mock("firebase-admin/auth");

afterEach(() => {
  jest.clearAllMocks();
});

describe("createUser()", () => {
  it("creates auth user with properties of given doc" +
  " and generated password.", async () => {
    // Prepare
    const uid = "user01";
    const email = "user01@example.com";
    const userProps = {email};
    const mockDocAccount = functionsTest.firestore
        .makeDocumentSnapshot(userProps, `accounts/${uid}`);
    auth.createUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await createUser(auth, mockDocAccount);

    // Evaluate
    expect(auth.createUser.mock.calls).toEqual([
      [
        {
          uid,
          email: userProps.email,
          password: expect.any(String),
          disabled: false,
        },
      ],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`create user: ${uid}`],
    ]);
  });

  it("create auth user without email.", async () => {
    // Prepare
    const uid = "user01";
    const userProps = {dummy: ""};
    const mockDocAccount = functionsTest.firestore
        .makeDocumentSnapshot(userProps, `accounts/${uid}`);
    auth.createUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await createUser(auth, mockDocAccount);

    // Evaluate
    expect(auth.createUser.mock.calls).toEqual([
      [
        {
          uid,
          disabled: false,
        },
      ],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`create user: ${uid}`],
    ]);
  });

  it("create auth user without name.", async () => {
    // Prepare
    const uid = "user01";
    const email = "user01@example.com";
    const userProps = {email};
    const mockDocAccount = functionsTest.firestore
        .makeDocumentSnapshot(userProps, `accounts/${uid}`);
    auth.createUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await createUser(auth, mockDocAccount);

    // Evaluate
    expect(auth.createUser.mock.calls).toEqual([
      [
        {
          uid,
          email: userProps.email,
          password: expect.any(String),
          disabled: false,
        },
      ],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`create user: ${uid}`],
    ]);
  });
});

describe("updateUser()", () => {
  it("updates auth user with disabled: true if deleted", async () => {
    // Prepare
    const uid = "user01";
    const userPropsBefore = {
      email: "user01@example.com",
      dummy: "old value",
    };
    const userPropsAfter = {
      email: "user01@example.com",
      deletedAt: new Date(),
      dummy: "new value",
    };
    const mockChange = functionsTest.makeChange(
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsBefore, `accounts/${uid}`),
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsAfter, `accounts/${uid}`),
    );
    auth.updateUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await updateUser(auth, mockChange);

    // Evaluate
    const result = {disabled: true};
    expect(auth.updateUser.mock.calls).toEqual([
      [uid, result],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`update user: ${uid} with props: ${JSON.stringify(result)}`],
    ]);
  });

  it("updates auth user with disabled: false if undeleted", async () => {
    // Prepare
    const uid = "user01";
    const userPropsBefore = {
      email: "user01@example.com",
      deletedAt: new Date(),
      dummy: "old value",
    };
    const userPropsAfter = {
      email: "user01@example.com",
      deletedAt: null,
      dummy: "new value",
    };
    const mockChange = functionsTest.makeChange(
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsBefore, `accounts/${uid}`),
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsAfter, `accounts/${uid}`),
    );
    auth.updateUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await updateUser(auth, mockChange);

    // Evaluate
    const result = {disabled: false};
    expect(auth.updateUser.mock.calls).toEqual([
      [uid, result],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`update user: ${uid} with props: ${JSON.stringify(result)}`],
    ]);
  });

  it("updates auth user with changed email", async () => {
    // Prepare
    const uid = "user01";
    const userPropsBefore = {
      email: "user01@example.com",
      name: "User 01",
      dummy: "old value",
    };
    const userPropsAfter = {
      email: "user02@example.com",
      name: "User 01",
      dummy: "new value",
    };
    const mockChange = functionsTest.makeChange(
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsBefore, `accounts/${uid}`),
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsAfter, `accounts/${uid}`),
    );
    auth.updateUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await updateUser(auth, mockChange);

    // Evaluate
    const result = {email: "user02@example.com"};
    expect(auth.updateUser.mock.calls).toEqual([
      [uid, result],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`update user: ${uid} with props: ${JSON.stringify(result)}`],
    ]);
  });

  it("ignore void email", async () => {
    // Prepare
    const uid = "user01";
    const userPropsBefore = {
      email: "user01@example.com",
      dummy: "old value",
    };
    const userPropsAfter = {
      dummy: "new value",
    };
    const mockChange = functionsTest.makeChange(
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsBefore, `accounts/${uid}`),
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsAfter, `accounts/${uid}`),
    );
    auth.updateUser = jest.fn(() => Promise.resolve({}));
    logger.info = jest.fn();

    // Run
    await updateUser(auth, mockChange);

    // Evaluate
    expect(auth.updateUser.mock.calls).toEqual([
    ]);
    expect(logger.warn.mock.calls).toEqual([
      [`skip update user: ${uid}`],
    ]);
  });

  it("don't update auth user without changes.", async () => {
    // Prepare
    const uid = "user01";
    const userPropsBefore = {
      email: "user@example.com",
      disabled: true,
      photoURL: "https://example.com/photos/1",
      dummy: "old value",
    };
    const userPropsAfter = {
      email: "user@example.com",
      disabled: true,
      dummy: "new value",
    };
    const mockChange = functionsTest.makeChange(
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsBefore, `accounts/${uid}`),
        functionsTest.firestore
            .makeDocumentSnapshot(userPropsAfter, `accounts/${uid}`),
    );
    auth.updateUser = jest.fn(() => Promise.resolve({}));
    logger.warn = jest.fn();

    // Run
    await updateUser(auth, mockChange);

    // Evaluate
    expect(auth.updateUser.mock.calls).toEqual([
    ]);
    expect(logger.warn.mock.calls).toEqual([
      [`skip update user: ${uid}`],
    ]);
  });
});


