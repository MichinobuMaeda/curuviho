import 'package:firebase_auth/firebase_auth.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'firebase_auth.g.dart';

@riverpod
Stream<User?> firebaseAuth(FirebaseAuthRef ref) =>
    FirebaseAuth.instance.authStateChanges();
