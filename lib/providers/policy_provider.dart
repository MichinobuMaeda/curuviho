import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../repositories/firebase_firestore.dart';

part 'policy_provider.g.dart';

@riverpod
Stream<String?> policy(PolicyRef ref) async* {
  yield ref.watch(
    confProvider.select(
      (selected) => selected.when(
        data: (data) => data.policy,
        error: (error, stack) {
          debugPrintStack(label: error.toString(), stackTrace: stack);
          return null;
        },
        loading: () => null,
      ),
    ),
  );
}
