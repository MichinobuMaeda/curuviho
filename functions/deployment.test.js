const functionsTest = require("firebase-functions-test")();
const logger = require("firebase-functions/logger");
const axios = require("axios");
const {
  restoreTriggerDoc,
  upgradeData,
  setUiVersion,
} = require("./deployment");
const {
  setTestEnv,
  stringToRegex,
} = require("./testUtils");

jest.mock("firebase-functions/logger");
jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("restoreTriggerDoc()", () => {
  it("restores deleted doc.", async () => {
    // Prepare
    const mockDocUpgrade = functionsTest.firestore
        .makeDocumentSnapshot({}, "service/deployment");
    mockDocUpgrade.ref.set = jest.fn()
        .mockImplementationOnce(() => Promise.resolve({}));

    // Run
    await restoreTriggerDoc({data: mockDocUpgrade});

    // Evaluate
    expect(mockDocUpgrade.ref.set.mock.calls).toEqual([
      [{createdAt: expect.any(Date)}],
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`restored doc ${mockDocUpgrade.ref.path}`],
    ]);
  });
});

describe("upgradeData()", () => {
  it("upgrades from data version: 0.", async () => {
    // Prepare
    setTestEnv();
    const primaryUserId = "primaryUserId";
    const mockDocConf = functionsTest.firestore
        .makeDocumentSnapshot({}, "service/conf");
    const mockDocAdmin = functionsTest.firestore
        .makeDocumentSnapshot({}, "groups/admin");
    mockDocConf.ref.get = jest.fn(() => Promise.resolve({exists: false}));
    mockDocConf.ref.set= jest.fn(() => Promise.resolve({}));
    mockDocConf.ref.update= jest.fn(() => Promise.resolve({}));
    mockDocAdmin.ref.get = jest.fn(() => Promise.resolve({exists: false}));
    mockDocAdmin.ref.set= jest.fn(() => Promise.resolve({}));
    const collection = {
      add: jest.fn(() => ({id: primaryUserId})),
      doc: jest.fn((id) => id === "conf" ? mockDocConf.ref : mockDocAdmin.ref),
    };
    const db = {
      collection: jest.fn(() => collection),
    };

    // Run
    await upgradeData(db);

    // Evaluate
    expect(db.collection.mock.calls[0]).toEqual([
      "service",
    ]);
    expect(collection.doc.mock.calls[0]).toEqual([
      "conf",
    ]);
    expect(mockDocConf.ref.get.mock.calls).toEqual([
      [],
    ]);

    expect(logger.info.mock.calls[0]).toEqual([
      "current data version: 0.",
    ]);
    expect(logger.info.mock.calls[1]).toEqual([
      "upgrade data 0 to 1.",
    ]);

    expect(db.collection.mock.calls[1]).toEqual([
      "groups",
    ]);
    expect(collection.doc.mock.calls[1]).toEqual([
      "admin",
    ]);
    expect(mockDocAdmin.ref.get.mock.calls).toEqual([
      [],
    ]);

    expect(db.collection.mock.calls[2]).toEqual([
      "accounts",
    ]);
    expect(collection.add.mock.calls[0]).toEqual([
      {
        email: process.env.PRIMARY_USER_EMAIL,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
    expect(db.collection.mock.calls[3]).toEqual([
      "users",
    ]);
    expect(collection.add.mock.calls[1]).toEqual([
      {
        name: "Primary user",
        accounts: ["primaryUserId"],
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
    expect(mockDocConf.ref.set.mock.calls[0]).toEqual([
      {
        uiVersion: "",
        dataVersion: 0,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);
    expect(mockDocAdmin.ref.set.mock.calls[0]).toEqual([
      {
        users: [primaryUserId],
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);

    expect(logger.info.mock.calls[2]).toEqual([
      "set data version: 1.",
    ]);
    expect(mockDocConf.ref.update.mock.calls[0]).toEqual([
      {
        dataVersion: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ]);

    expect(db.collection.mock.calls.length).toEqual(4);
    expect(collection.doc.mock.calls.length).toEqual(2);
    expect(collection.add.mock.calls.length).toEqual(2);
    expect(mockDocConf.ref.get.mock.calls.length).toEqual(1);
    expect(mockDocConf.ref.set.mock.calls.length).toEqual(1);
    expect(mockDocConf.ref.update.mock.calls.length).toEqual(1);
    expect(mockDocAdmin.ref.get.mock.calls.length).toEqual(1);
    expect(mockDocAdmin.ref.set.mock.calls.length).toEqual(1);
    expect(logger.info.mock.calls.length).toEqual(3);
  });

  it("don't upgrade from latest data version.", async () => {
    // Prepare
    setTestEnv();
    const ts = new Date();
    const mockDocConfData = {
      uiVersion: "1.0.0+1",
      dataVersion: 1,
      createdAt: ts,
      updatedAt: ts,
    };
    const mockDocConf = functionsTest.firestore
        .makeDocumentSnapshot(mockDocConfData, "service/conf");
    mockDocConf.ref.get = jest.fn(() => Promise.resolve(mockDocConf));
    const collection = {doc: jest.fn(() => mockDocConf.ref)};
    const db = {collection: jest.fn(() => collection)};

    // Run
    await upgradeData(db);

    // Evaluate
    expect(db.collection.mock.calls[0]).toEqual([
      "service",
    ]);
    expect(collection.doc.mock.calls[0]).toEqual([
      "conf",
    ]);
    expect(mockDocConf.ref.get.mock.calls[0]).toEqual([
    ]);

    expect(logger.info.mock.calls[0]).toEqual([
      "current data version: 1.",
    ]);
    expect(logger.info.mock.calls[1]).toEqual([
      "Skip to upgrade data.",
    ]);

    expect(db.collection.mock.calls.length).toEqual(1);
    expect(collection.doc.mock.calls.length).toEqual(1);
    expect(mockDocConf.ref.get.mock.calls.length).toEqual(1);
    expect(logger.info.mock.calls.length).toEqual(2);
  });
});

describe("setUiVersion()", () => {
  const project = "test-project-id";
  const event = {project};
  const mockDocConfData = {
    uiVersion: "old version",
    createdAt: new Date("2000-01-01T00:00:00.000Z"),
    updatedAt: new Date("2000-12-31T23:59:50.999Z"),
  };
  const mockDocConf = functionsTest.firestore
      .makeDocumentSnapshot(mockDocConfData, "service/conf");
  mockDocConf.ref.get = jest.fn(() => Promise.resolve(mockDocConf));
  mockDocConf.ref.update= jest.fn(() => Promise.resolve({}));
  const collection = {doc: jest.fn(() => mockDocConf.ref)};
  const db = {collection: jest.fn(() => collection)};

  it("sets new version from the site to doc 'version'.", async () => {
    // Prepare
    const httpRes = {data: {version: "new version"}};
    axios.get.mockImplementationOnce(() => Promise.resolve(httpRes));

    // Run
    await setUiVersion(event, db);

    // Evaluate
    const url = stringToRegex(`https://${project}.web.app/version.json`);
    const params = "check=[0-9]+";
    expect(axios.get.mock.calls[0]).toEqual([
      expect.stringMatching(new RegExp(`^${url}\\?${params}$`)),
    ]);

    expect(logger.info.mock.calls[0]).toEqual([
      `get new UI version: ${httpRes.data.version}`,
    ]);

    expect(db.collection.mock.calls[0]).toEqual([
      "service",
    ]);
    expect(collection.doc.mock.calls[0]).toEqual([
      "conf",
    ]);
    expect(mockDocConf.ref.update.mock.calls[0]).toEqual([
      {
        uiVersion: httpRes.data.version,
        updatedAt: expect.any(Date),
      },
    ]);
    expect(mockDocConf.ref.update.mock.calls[0][0].updatedAt.getTime())
        .toBeGreaterThan(mockDocConfData.updatedAt.getTime());

    expect(logger.info.mock.calls[1]).toEqual([
      `updated ${mockDocConf.ref.path}.uiVersion: ${httpRes.data.version}`,
    ]);

    expect(axios.get.mock.calls.length).toEqual(1);
    expect(db.collection.mock.calls.length).toEqual(1);
    expect(collection.doc.mock.calls.length).toEqual(1);
    expect(mockDocConf.ref.update.mock.calls.length).toEqual(1);
    expect(logger.info.mock.calls.length).toEqual(2);
  });

  it("don't sets old version from the site to doc 'version'.", async () => {
    // Prepare
    const httpRes = {data: {version: "old version"}};
    axios.get.mockImplementationOnce(() => Promise.resolve(httpRes));

    // Run
    await setUiVersion(event, db);

    // Evaluate
    const url = stringToRegex(`https://${project}.web.app/version.json`);
    const params = "check=[0-9]+";
    expect(axios.get.mock.calls[0]).toEqual([
      expect.stringMatching(new RegExp(`^${url}\\?${params}$`)),
    ]);
    expect( db.collection.mock.calls[0]).toEqual([
      "service",
    ]);
    expect( collection.doc.mock.calls[0]).toEqual([
      "conf",
    ]);
    expect(logger.info.mock.calls[0]).toEqual([
      `get new UI version: ${httpRes.data.version}`,
    ]);

    expect(axios.get.mock.calls.length).toEqual(1);
    expect(db.collection.mock.calls.length).toEqual(1);
    expect(collection.doc.mock.calls.length).toEqual(1);
    expect(mockDocConf.ref.update.mock.calls.length).toEqual(0);
    expect(logger.info.mock.calls.length).toEqual(1);
  });
});
