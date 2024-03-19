import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

part 'conf.freezed.dart';

@freezed
class Conf with _$Conf {
  const factory Conf({
    required String? uiVersion,
    required String? policy,
  }) = _Conf;

  factory Conf.fromFirestoreDoc(DocumentSnapshot<Map<String, dynamic>>? doc) {
    final Map<String, dynamic> data = doc!.data()!;

    return Conf(
      uiVersion: data.containsKey('uiVersion') ? data['uiVersion'] : null,
      policy: data.containsKey('policy') ? data['policy'] : null,
    );
  }
}
