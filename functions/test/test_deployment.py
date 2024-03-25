import unittest
from unittest import mock
from unittest.mock import MagicMock
from google.cloud import firestore
from deployment import restore_trigger_doc, set_ui_version


class MockDocRef:
    def __init__(self, path: str):
        self.path = path


class MockDocSnap:
    def __init__(self, path: str, data):
        self.reference = MockDocRef(path)
        self.data = data

    def get(self, key: str):
        return self.data[key]


class MockEvent:
    def __init__(self, project: str, data: MockDocSnap):
        self.project = project
        self.data = data


class MockResponse:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data


def mocked_requests_get_success(*args, **kwargs):
    return MockResponse({"version": "1.2.3"}, 200)


def mocked_requests_get_failed(*args, **kwargs):
    return MockResponse(None, 500)


class TestMain(unittest.TestCase):
    def test_restore_trigger_doc(
        self,
    ):
        # Prepare
        event = MockEvent("test_project", MockDocSnap("test/path", {}))
        event.data.reference.set = MagicMock(return_value=None)

        # Run
        restore_trigger_doc(event)

        # Check
        event.data.reference.set.assert_called_with(
            {
                "createdAt": firestore.SERVER_TIMESTAMP,
            }
        )

    @mock.patch("requests.get", side_effect=mocked_requests_get_success)
    def test_set_ui_version_update(
        self,
        requests_get_mock,
    ):
        # Prepare
        ver = "1.2.3"
        event = MockEvent(
            "test_success",
            MockDocSnap("test/path", {"uiVersion": "0.0.0"}),
        )
        event.data.reference.update = MagicMock(return_value=None)

        # Run
        set_ui_version(event)

        # Check
        event.data.reference.update.assert_called_with(
            {
                "uiVersion": ver,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

    @mock.patch("requests.get", side_effect=mocked_requests_get_success)
    def test_set_ui_version_no_action(
        self,
        requests_get_mock,
    ):
        # Prepare
        ver = "1.2.3"
        event = MockEvent(
            "test_success",
            MockDocSnap("test/path", {"uiVersion": ver}),
        )
        event.data.reference.update = MagicMock(return_value=None)

        # Run
        set_ui_version(event)

        # Check
        event.data.reference.update.assert_not_called()

    @mock.patch("requests.get", side_effect=mocked_requests_get_failed)
    def test_set_ui_version_failed(
        self,
        requests_get_mock,
    ):
        # Prepare
        event = MockEvent("test_failed", MockDocSnap("test/path", {}))
        event.data.reference.update = MagicMock(return_value=None)

        # Run
        set_ui_version(event)

        # Check
        event.data.reference.update.assert_not_called()
