import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

import '../config.dart';

part 'ui_version.freezed.dart';
part 'ui_version.g.dart';

@freezed
class UiVersion with _$UiVersion {
  static const initialValue = UiVersion(
    current: version,
    deployed: null,
  );

  const factory UiVersion({
    required String current,
    required String? deployed,
  }) = _UiVersion;

  factory UiVersion.fromJson(Map<String, Object?> json) =>
      _$UiVersionFromJson(json);

  factory UiVersion.fromConf(DocumentSnapshot<Map<String, dynamic>> conf) {
    try {
      return conf.exists
          ? UiVersion(
              current: version,
              deployed: conf.get('uiVersion'),
            )
          : initialValue;
    } catch (e) {
      return initialValue;
    }
  }
}
