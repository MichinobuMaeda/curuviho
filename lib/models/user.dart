import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

part 'user.freezed.dart';

@freezed
class User with _$User {
  const factory User({
    required String? id,
    required String? name,
  }) = _User;

  factory User.fromFirestoreDoc(DocumentSnapshot<Map<String, dynamic>>? doc) {
    final Map<String, dynamic>? data = doc?.data();

    return User(
      id: doc?.id,
      name: data?.containsKey('name') == true ? data!['name'] : null,
    );
  }
}
