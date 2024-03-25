from datetime import datetime
from firebase_admin import auth
from firebase_functions.firestore_fn import Event, DocumentSnapshot
from google.cloud import firestore
import os
import requests


def restore_trigger_doc(
    event: Event[DocumentSnapshot],
):
    print("Start: restoreTriggerDoc")
    ref = event.data.reference
    ref.set(
        {
            "createdAt": firestore.SERVER_TIMESTAMP,
        }
    )
    print(f"restored doc: {ref.path}")
    print("End  : restoreTriggerDoc")


def set_ui_version(
    event: Event[DocumentSnapshot],
):
    print("Start: setUiVersion")
    res = requests.get(
        f"https://{event.project}.web.app/version.json"
        f"?check={datetime.now().timestamp()}"
    )
    if res.status_code == 200:
        ver = res.json()["version"]
        doc = event.data
        if doc.get("uiVersion") != ver:
            doc.reference.update(
                {
                    "uiVersion": ver,
                    "updatedAt": firestore.SERVER_TIMESTAMP,
                }
            )
    else:
        print(f"Error: HTTP Status: {res.status_code}")
    print("End  : setUiVersion")


def upgrade_data(
    db: firestore.Client,
    auth: auth.Client,
):
    print("Start: upgrade_data")

    conf_ref = db.collection("service").document("conf")
    conf_doc = conf_ref.get()
    cur_ver = 0

    if conf_doc.exists:
        cur_ver = conf_doc.get("dataVersion")
    else:
        conf_ref.set(
            {
                "dataVersion": 0,
                "uiVersion": "",
                "policy": "## Privacy policy",
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )
    print(f"CurVer: {cur_ver}")

    new_ver = 1
    print(f"NewVer: {new_ver}")

    if cur_ver == new_ver:
        pass
    elif cur_ver == 0:
        user = auth.create_user(
            email=os.environ.get("PRIMARY_USER_EMAIL"),
        )
        db.collection("service").document("admins").set(
            {
                "name": "Administrators",
                "accounts": [user.uid],
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

        test_ref = db.collection("orgs").document("test")

        test_ref.set(
            {
                "name": "Test",
                "accounts": [user.uid],
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

        (_, user_doc) = test_ref.collection("users").add(
            {
                "name": "Primary user",
                "email": os.environ.get("PRIMARY_USER_EMAIL"),
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

        test_ref.collection("accounts").document(user.uid).set(
            {
                "user": user_doc.id,
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

        test_ref.collection("groups").document("managers").set(
            {
                "name": "Managers",
                "users": [user_doc.id],
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

        conf_ref.update(
            {
                "dataVersion": new_ver,
                "createdAt": firestore.SERVER_TIMESTAMP,
                "updatedAt": firestore.SERVER_TIMESTAMP,
            }
        )

    print("End  : upgrade_data")
