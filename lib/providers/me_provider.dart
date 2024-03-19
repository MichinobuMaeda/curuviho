import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/user.dart';
import '../repositories/firebase_firestore.dart';

part 'me_provider.g.dart';

@Riverpod(keepAlive: true)
Future<User?> me(MeRef ref) async {
  final id = await ref.watch(
    myAccountProvider.selectAsync((account) => account?.user),
  );
  for (User user in ref.watch(usersProvider).value ?? []) {
    if (user.id == id) return user;
  }
  return null;
}
