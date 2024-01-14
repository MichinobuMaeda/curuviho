const functionsTest = require("firebase-functions-test")();
const auth = require("firebase-admin/auth");
const firestore = require("firebase-admin/firestore");
const upgrade = require("./deployment");
const index = require("./index");
const testUtils = require("./testUtils");

jest.mock("firebase-functions/logger");
jest.mock("./deployment");
jest.mock("./testUtils");

afterEach(() => {
  jest.clearAllMocks();
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
        expect.any(auth.Auth),
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
        expect.any(auth.Auth),
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
