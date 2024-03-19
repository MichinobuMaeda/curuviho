import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

part 'account.freezed.dart';

@freezed
class Account with _$Account {
  const factory Account({
    required String? name,
    required String? email,
    required String? user,
  }) = _Account;

  factory Account.fromFirestoreDoc(
      DocumentSnapshot<Map<String, dynamic>>? doc) {
    final Map<String, dynamic> data = doc!.data()!;

    return Account(
      name: data.containsKey('name') ? data['name'] : null,
      email: data.containsKey('email') ? data['email'] : null,
      user: data.containsKey('user') ? data['user'] : null,
    );
  }
}
