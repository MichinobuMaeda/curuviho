from firebase_functions import https_fn
from firebase_functions.firestore_fn import (
    on_document_deleted,
    Event,
    DocumentSnapshot,
)
from firebase_admin import (
    initialize_app,
    firestore,
    auth,
)
import os
import sys
from pathlib import Path

# https://github.com/firebase/firebase-functions-python/pull/12
sys.path.insert(0, Path(__file__).parent.as_posix())

from deployment import (
    restore_trigger_doc,
    upgrade_data,
    set_ui_version,
)
from test.utils import set_test_data

admin = initialize_app()


@on_document_deleted(
    region="asia-northeast2",
    document="service/deployment",
)
def on_deleted_deployment(
    event: Event[DocumentSnapshot | None],
) -> None:  # pragma: no cover
    if event.data is None:
        print("Error: service/deployment is null")
    else:
        firestore_client = firestore.client(admin)
        auth_client = auth.Client(admin)
        restore_trigger_doc(event)
        upgrade_data(firestore_client, auth_client)
        set_ui_version(event)


@https_fn.on_call(
    region="asia-northeast2",
)
def generate_test_data(
    _: https_fn.CallableRequest,
) -> any:  # pragma: no cover
    print(f"TEST : {os.environ.get('TEST')}")

    if os.environ.get("TEST") != "Y":
        return

    firestore_client = firestore.client(admin)
    auth_client = auth.Client(admin)
    upgrade_data(firestore_client, auth_client)
    set_test_data(firestore_client, auth_client)
