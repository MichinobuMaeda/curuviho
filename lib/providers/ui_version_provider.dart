import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/ui_version.dart';
import '../repositories/firebase_firestore.dart';

part 'ui_version_provider.g.dart';

@riverpod
Stream<UiVersion> uiVersion(UiVersionRef ref) async* {
  yield ref.watch(confProvider).when(
        loading: () => UiVersion.initialValue,
        data: (conf) => UiVersion.fromConf(conf),
        error: (error, stack) {
          debugPrintStack(label: error.toString(), stackTrace: stack);
          return UiVersion.initialValue;
        },
      );
}
