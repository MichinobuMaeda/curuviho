const functionsTest = require("firebase-functions-test")();
const auth = require("firebase-admin/auth");
const firestore = require("firebase-admin/firestore");
const accounts = require("./accounts");
const upgrade = require("./deployment");
const index = require("./index");
const testUtils = require("./testUtils");

jest.mock("firebase-functions/logger");
jest.mock("./accounts");
jest.mock("./deployment");
jest.mock("./testUtils");

afterEach(() => {
  jest.clearAllMocks();
});

describe("onCreateAccount", () => {
  it("calls createUser()", async () => {
    // Prepare
    const mockDocAccount = functionsTest.firestore
        .makeDocumentSnapshot({email: "user@example.com"}, "accounts/user01");

    // Run
    await functionsTest.wrap(index.onCreateAccount)(mockDocAccount);

    // Evaluate
    expect(accounts.createUser.mock.calls).toEqual([
      [
        expect.any(auth.Auth),
        expect.any(firestore.DocumentSnapshot),
      ],
    ]);
  });
});

describe("onUpdateAccount", () => {
  it("calls updateUser()", async () => {
    // Prepare
    const mockChange = functionsTest.makeChange(
        functionsTest.firestore.makeDocumentSnapshot({
          displayName: "old Name",
        }, "accounts/user01"),
        functionsTest.firestore.makeDocumentSnapshot({
          displayName: "new name",
        }, "accounts/user01"),
    );

    // Run
    await functionsTest.wrap(index.onUpdateAccount)(mockChange);

    // Evaluate
    expect(accounts.updateUser.mock.calls).toEqual([
      [
        expect.any(auth.Auth),
        expect.objectContaining({
          before: expect.any(firestore.DocumentSnapshot),
          after: expect.any(firestore.DocumentSnapshot),
        }),
      ],
    ]);
  });
});

describe("onDeletedDeployment", () => {
  it("calls restoreTriggerDoc(), upgrade() and setUiVersion()", async () => {
    // Prepare
    const mockDocDeployment = functionsTest.firestore
        .makeDocumentSnapshot({}, "service/deployment");

    // Run
    await functionsTest.wrap(index.onDeletedDeployment)(mockDocDeployment);

    // Evaluate
    expect(upgrade.restoreTriggerDoc.mock.calls).toEqual([
      [
        expect.objectContaining({document: mockDocDeployment.ref.path}),
      ],
    ]);
    expect(upgrade.upgradeData.mock.calls).toEqual([
      [
        expect.any(firestore.Firestore),
      ],
    ]);
    expect(upgrade.setUiVersion.mock.calls).toEqual([
      [
        expect.objectContaining({document: mockDocDeployment.ref.path}),
        expect.any(firestore.Firestore),
      ],
    ]);
  });
});

describe("generateTestData", () => {
  it("calls upgradeData() if NODE_ENV == 'test'", async () => {
    // Prepare

    // Run
    await functionsTest.wrap(index.generateTestData)();

    // Evaluate
    expect(upgrade.upgradeData.mock.calls).toEqual([
      [
        expect.any(firestore.Firestore),
      ],
    ]);
    expect(testUtils.setTestData.mock.calls).toEqual([
      [
        expect.any(firestore.Firestore),
        expect.any(auth.Auth),
      ],
    ]);
  });

  it("don't calls upgradeData() if NODE_ENV == 'production'", () => {
    // Prepare
    const mockDocTest = functionsTest.firestore
        .makeDocumentSnapshot({}, "service/test");
    const wrapped = functionsTest.wrap(index.generateTestData);
    const orgNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    // Run
    wrapped(mockDocTest);

    // Evaluate
    expect(upgrade.upgradeData.mock.calls).toEqual([
    ]);
    expect(testUtils.setTestData.mock.calls).toEqual([
    ]);
    process.env.NODE_ENV = orgNodeEnv;
  });
});
