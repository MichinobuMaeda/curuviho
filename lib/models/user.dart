import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  static const initialValue = User(
    id: null,
    name: null,
  );

  const factory User({
    required String? id,
    required String? name,
  }) = _User;

  factory User.fromJson(Map<String, Object?> json) => _$UserFromJson(json);

  factory User.fromFirestoreDoc(DocumentSnapshot<Map<String, dynamic>>? doc) {
    final Map<String, dynamic>? data = doc?.data();

    return User(
      id: doc?.id,
      name: data?.containsKey('name') == true ? data!['name'] : null,
    );
  }
}
