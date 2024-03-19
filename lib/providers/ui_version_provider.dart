import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../repositories/firebase_firestore.dart';

part 'ui_version_provider.g.dart';

@Riverpod(keepAlive: true)
Stream<String?> uiVersion(UiVersionRef ref) async* {
  yield ref.watch(
    confProvider.select(
      (selected) => selected.when(
        data: (data) => data.uiVersion,
        error: (error, stack) {
          debugPrintStack(label: error.toString(), stackTrace: stack);
          return null;
        },
        loading: () => null,
      ),
    ),
  );
}
