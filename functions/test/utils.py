from google.cloud import firestore
from firebase_admin import auth


def set_test_data(db: firestore.Client, auth: auth.Client):
    print("Start: set_test_data")

    db.collection("service").document("conf").update(
        {
            "uiVersion": "for test",
            "updatedAt": firestore.SERVER_TIMESTAMP,
        }
    )

    admins = db.collection("service").document("admins").get()
    pri_uid = admins.get("accounts")[0]
    auth.update_user(
        pri_uid,
        password="password",
    )

    test_ref = db.collection("orgs").document("test")
    (_, user01_doc) = test_ref.collection("users").add(
        {
            "name": "User 01",
            "email": "user01@example.com",
            "createdAt": firestore.SERVER_TIMESTAMP,
            "updatedAt": firestore.SERVER_TIMESTAMP,
        }
    )
    test_ref.collection("groups").document("group01").set(
        {
            "users": [user01_doc.id],
            "createdAt": firestore.SERVER_TIMESTAMP,
            "updatedAt": firestore.SERVER_TIMESTAMP,
        }
    )

    (_, account01_doc) = test_ref.collection("accounts").add(
        {
            "user": user01_doc.id,
            "createdAt": firestore.SERVER_TIMESTAMP,
            "updatedAt": firestore.SERVER_TIMESTAMP,
        }
    )
    auth.create_user(
        uid=account01_doc.id,
        email="user01@example.com",
        password="password",
    )

    print("End  : set_test_data")
