import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../repositories/firebase_auth.dart';

part 'auth_loading_state_provider.g.dart';

@riverpod
Future<bool> authLoadingState(AuthLoadingStateRef ref) => ref
    .watch(firebaseAuthProvider.selectAsync((authUser) => authUser?.loaded))
    .then((loaded) => loaded ?? false);
