import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'auth_user.freezed.dart';
part 'auth_user.g.dart';

@freezed
class AuthUser with _$AuthUser {
  static const initialValue = AuthUser(
    loaded: true,
    uid: null,
    email: null,
  );

  const factory AuthUser({
    required bool loaded,
    required String? uid,
    required String? email,
  }) = _AuthUser;

  factory AuthUser.fromJson(Map<String, Object?> json) =>
      _$AuthUserFromJson(json);
}
