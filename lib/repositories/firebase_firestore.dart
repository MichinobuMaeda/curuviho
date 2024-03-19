import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/account.dart';
import '../models/conf.dart';
import '../models/user.dart';
import 'firebase_auth.dart';

part 'firebase_firestore.g.dart';

String? getStringValue(
  DocumentSnapshot<Map<String, dynamic>> doc,
  String key,
) =>
    doc.data()?.containsKey(key) != null ? doc.data()![key] : null;

bool isDeleted(
  DocumentSnapshot<Map<String, dynamic>> doc,
) =>
    (!doc.exists) ||
    (doc.data()?.containsKey('deletedAt') == true &&
        doc.get('deletedAt') != null);

@Riverpod(keepAlive: true)
Stream<Conf> conf(ConfRef ref) => FirebaseFirestore.instance
    .collection('service')
    .doc('conf')
    .snapshots()
    .map((doc) => Conf.fromFirestoreDoc(doc));

@Riverpod(keepAlive: true)
Stream<List<User>> users(UsersRef ref) {
  return ref.watch(firebaseAuthProvider.select((selected) => selected.when(
        data: (user) => user?.uid == null
            ? const Stream.empty()
            : FirebaseFirestore.instance.collection('users').snapshots().map(
                  (snapshot) => snapshot.docs
                      .map((doc) => User.fromFirestoreDoc(doc))
                      .toList(),
                ),
        error: (error, stack) {
          debugPrintStack(label: error.toString(), stackTrace: stack);
          return const Stream.empty();
        },
        loading: () => const Stream.empty(),
      )));
}

@Riverpod(keepAlive: true)
Future<Account?> myAccount(MyAccountRef ref) async {
  return ref.watch(firebaseAuthProvider.select((selected) => selected.when(
        data: (user) => user?.uid == null
            ? null
            : FirebaseFirestore.instance
                .collection('accounts')
                .doc(user!.uid)
                .get()
                .then(
                  (doc) => isDeleted(doc)
                      ? null
                      : Account(
                          name: getStringValue(doc, 'name'),
                          email: getStringValue(doc, 'email'),
                          user: getStringValue(doc, 'user'),
                        ),
                ),
        error: (error, stack) {
          debugPrintStack(label: error.toString(), stackTrace: stack);
          return null;
        },
        loading: () => null,
      )));
}
