const functionsTest = require("firebase-functions-test")();
const logger = require("firebase-functions/logger");
const axios = require("axios");
const {
  restoreTriggerDoc,
  upgradeData,
  setUiVersion,
} = require("./upgrade");
const {
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
        .makeDocumentSnapshot({}, "service/upgrade");
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
    const mockDocConf = functionsTest.firestore
        .makeDocumentSnapshot({}, "service/conf");
    mockDocConf.ref.get = jest.fn(() => Promise.resolve(mockDocConf));
    mockDocConf.ref.set= jest.fn(() => Promise.resolve({}));
    const collection = {doc: jest.fn(() => mockDocConf.ref)};
    const db = {collection: jest.fn(() => collection)};

    // Run
    await upgradeData(db);

    // Evaluate
    expect(db.collection.mock.calls).toEqual([
      ["service"],
    ]);
    expect(collection.doc.mock.calls).toEqual([
      ["conf"],
    ]);
    expect(mockDocConf.ref.get.mock.calls).toEqual([
      [],
    ]);
    expect(mockDocConf.ref.set.mock.calls).toEqual([
      [{
        uiVersion: "",
        dataVersion: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }],
    ]);
    expect(logger.info.mock.calls).toEqual([
      ["current data version: 0."],
      ["latest data version: 1."],
    ]);
  });

  it("don't upgrade from latest data version.", async () => {
    // Prepare
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
    mockDocConf.ref.set= jest.fn(() => Promise.resolve({}));
    const collection = {doc: jest.fn(() => mockDocConf.ref)};
    const db = {collection: jest.fn(() => collection)};

    // Run
    await upgradeData(db);

    // Evaluate
    expect(db.collection.mock.calls).toEqual([
      ["service"],
    ]);
    expect(collection.doc.mock.calls).toEqual([
      ["conf"],
    ]);
    expect(mockDocConf.ref.get.mock.calls).toEqual([
      [],
    ]);
    expect(mockDocConf.ref.set.mock.calls).toEqual([
    ]);
    expect(logger.info.mock.calls).toEqual([
      ["current data version: 1."],
      ["latest data version: 1."],
    ]);
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
    expect(axios.get.mock.calls).toEqual([
      [expect.stringMatching(new RegExp(`^${url}\\?${params}$`))],
    ]);
    expect(db.collection.mock.calls).toEqual([
      ["service"],
    ]);
    expect(collection.doc.mock.calls).toEqual([
      ["conf"],
    ]);
    expect(mockDocConf.ref.update.mock.calls).toEqual([
      [{
        uiVersion: httpRes.data.version,
        updatedAt: expect.any(Date),
      }],
    ]);
    expect(mockDocConf.ref.update.mock.calls[0][0].updatedAt.getTime())
        .toBeGreaterThan(mockDocConfData.updatedAt.getTime());
    expect(logger.info.mock.calls).toEqual([
      [`get new UI version: ${httpRes.data.version}`],
      [`updated ${mockDocConf.ref.path}.uiVersion: ${httpRes.data.version}`],
    ]);
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
    expect(axios.get.mock.calls).toEqual([
      [expect.stringMatching(new RegExp(`^${url}\\?${params}$`))],
    ]);
    expect( db.collection.mock.calls).toEqual([
      ["service"],
    ]);
    expect( collection.doc.mock.calls).toEqual([
      ["conf"],
    ]);
    expect( mockDocConf.ref.update.mock.calls).toEqual([
    ]);
    expect(logger.info.mock.calls).toEqual([
      [`get new UI version: ${httpRes.data.version}`],
    ]);
  });
});
