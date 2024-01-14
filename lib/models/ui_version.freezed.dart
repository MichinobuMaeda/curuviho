// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'ui_version.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

UiVersion _$UiVersionFromJson(Map<String, dynamic> json) {
  return _UiVersion.fromJson(json);
}

/// @nodoc
mixin _$UiVersion {
  String get current => throw _privateConstructorUsedError;
  String? get deployed => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UiVersionCopyWith<UiVersion> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UiVersionCopyWith<$Res> {
  factory $UiVersionCopyWith(UiVersion value, $Res Function(UiVersion) then) =
      _$UiVersionCopyWithImpl<$Res, UiVersion>;
  @useResult
  $Res call({String current, String? deployed});
}

/// @nodoc
class _$UiVersionCopyWithImpl<$Res, $Val extends UiVersion>
    implements $UiVersionCopyWith<$Res> {
  _$UiVersionCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? current = null,
    Object? deployed = freezed,
  }) {
    return _then(_value.copyWith(
      current: null == current
          ? _value.current
          : current // ignore: cast_nullable_to_non_nullable
              as String,
      deployed: freezed == deployed
          ? _value.deployed
          : deployed // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$UiVersionImplCopyWith<$Res>
    implements $UiVersionCopyWith<$Res> {
  factory _$$UiVersionImplCopyWith(
          _$UiVersionImpl value, $Res Function(_$UiVersionImpl) then) =
      __$$UiVersionImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String current, String? deployed});
}

/// @nodoc
class __$$UiVersionImplCopyWithImpl<$Res>
    extends _$UiVersionCopyWithImpl<$Res, _$UiVersionImpl>
    implements _$$UiVersionImplCopyWith<$Res> {
  __$$UiVersionImplCopyWithImpl(
      _$UiVersionImpl _value, $Res Function(_$UiVersionImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? current = null,
    Object? deployed = freezed,
  }) {
    return _then(_$UiVersionImpl(
      current: null == current
          ? _value.current
          : current // ignore: cast_nullable_to_non_nullable
              as String,
      deployed: freezed == deployed
          ? _value.deployed
          : deployed // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$UiVersionImpl with DiagnosticableTreeMixin implements _UiVersion {
  const _$UiVersionImpl({required this.current, required this.deployed});

  factory _$UiVersionImpl.fromJson(Map<String, dynamic> json) =>
      _$$UiVersionImplFromJson(json);

  @override
  final String current;
  @override
  final String? deployed;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'UiVersion(current: $current, deployed: $deployed)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'UiVersion'))
      ..add(DiagnosticsProperty('current', current))
      ..add(DiagnosticsProperty('deployed', deployed));
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$UiVersionImpl &&
            (identical(other.current, current) || other.current == current) &&
            (identical(other.deployed, deployed) ||
                other.deployed == deployed));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, current, deployed);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$UiVersionImplCopyWith<_$UiVersionImpl> get copyWith =>
      __$$UiVersionImplCopyWithImpl<_$UiVersionImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$UiVersionImplToJson(
      this,
    );
  }
}

abstract class _UiVersion implements UiVersion {
  const factory _UiVersion(
      {required final String current,
      required final String? deployed}) = _$UiVersionImpl;

  factory _UiVersion.fromJson(Map<String, dynamic> json) =
      _$UiVersionImpl.fromJson;

  @override
  String get current;
  @override
  String? get deployed;
  @override
  @JsonKey(ignore: true)
  _$$UiVersionImplCopyWith<_$UiVersionImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
