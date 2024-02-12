// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'conf.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

Conf _$ConfFromJson(Map<String, dynamic> json) {
  return _Conf.fromJson(json);
}

/// @nodoc
mixin _$Conf {
  String? get uiVersion => throw _privateConstructorUsedError;
  String? get policy => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ConfCopyWith<Conf> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ConfCopyWith<$Res> {
  factory $ConfCopyWith(Conf value, $Res Function(Conf) then) =
      _$ConfCopyWithImpl<$Res, Conf>;
  @useResult
  $Res call({String? uiVersion, String? policy});
}

/// @nodoc
class _$ConfCopyWithImpl<$Res, $Val extends Conf>
    implements $ConfCopyWith<$Res> {
  _$ConfCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uiVersion = freezed,
    Object? policy = freezed,
  }) {
    return _then(_value.copyWith(
      uiVersion: freezed == uiVersion
          ? _value.uiVersion
          : uiVersion // ignore: cast_nullable_to_non_nullable
              as String?,
      policy: freezed == policy
          ? _value.policy
          : policy // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ConfImplCopyWith<$Res> implements $ConfCopyWith<$Res> {
  factory _$$ConfImplCopyWith(
          _$ConfImpl value, $Res Function(_$ConfImpl) then) =
      __$$ConfImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String? uiVersion, String? policy});
}

/// @nodoc
class __$$ConfImplCopyWithImpl<$Res>
    extends _$ConfCopyWithImpl<$Res, _$ConfImpl>
    implements _$$ConfImplCopyWith<$Res> {
  __$$ConfImplCopyWithImpl(_$ConfImpl _value, $Res Function(_$ConfImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? uiVersion = freezed,
    Object? policy = freezed,
  }) {
    return _then(_$ConfImpl(
      uiVersion: freezed == uiVersion
          ? _value.uiVersion
          : uiVersion // ignore: cast_nullable_to_non_nullable
              as String?,
      policy: freezed == policy
          ? _value.policy
          : policy // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ConfImpl with DiagnosticableTreeMixin implements _Conf {
  const _$ConfImpl({required this.uiVersion, required this.policy});

  factory _$ConfImpl.fromJson(Map<String, dynamic> json) =>
      _$$ConfImplFromJson(json);

  @override
  final String? uiVersion;
  @override
  final String? policy;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'Conf(uiVersion: $uiVersion, policy: $policy)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'Conf'))
      ..add(DiagnosticsProperty('uiVersion', uiVersion))
      ..add(DiagnosticsProperty('policy', policy));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ConfImpl &&
            (identical(other.uiVersion, uiVersion) ||
                other.uiVersion == uiVersion) &&
            (identical(other.policy, policy) || other.policy == policy));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, uiVersion, policy);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ConfImplCopyWith<_$ConfImpl> get copyWith =>
      __$$ConfImplCopyWithImpl<_$ConfImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ConfImplToJson(
      this,
    );
  }
}

abstract class _Conf implements Conf {
  const factory _Conf(
      {required final String? uiVersion,
      required final String? policy}) = _$ConfImpl;

  factory _Conf.fromJson(Map<String, dynamic> json) = _$ConfImpl.fromJson;

  @override
  String? get uiVersion;
  @override
  String? get policy;
  @override
  @JsonKey(ignore: true)
  _$$ConfImplCopyWith<_$ConfImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
