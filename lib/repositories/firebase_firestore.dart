import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'firebase_firestore.g.dart';

@riverpod
Stream<DocumentSnapshot<Map<String, dynamic>>> conf(ConfRef ref) =>
    FirebaseFirestore.instance.collection('service').doc('conf').snapshots();
