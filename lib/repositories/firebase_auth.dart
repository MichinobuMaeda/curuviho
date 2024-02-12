import 'package:firebase_auth/firebase_auth.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/auth_user.dart';

part 'firebase_auth.g.dart';

@Riverpod(keepAlive: true)
Stream<AuthUser?> firebaseAuth(FirebaseAuthRef ref) =>
    FirebaseAuth.instance.authStateChanges().map(
          (user) => AuthUser(
            loaded: true,
            uid: user?.uid,
            email: user?.email,
          ),
        );
