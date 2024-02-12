import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

part 'conf.freezed.dart';
part 'conf.g.dart';

@freezed
class Conf with _$Conf {
  static const initialValue = Conf(
    uiVersion: "",
    policy: "",
  );

  const factory Conf({
    required String? uiVersion,
    required String? policy,
  }) = _Conf;

  factory Conf.fromJson(Map<String, Object?> json) => _$ConfFromJson(json);

  factory Conf.fromFirestoreDoc(DocumentSnapshot<Map<String, dynamic>>? doc) {
    final Map<String, dynamic> data = doc!.data()!;

    return Conf(
      uiVersion: data.containsKey('policy') ? data['uiVersion'] : null,
      policy: data.containsKey('policy') ? data['policy'] : null,
    );
  }
}
