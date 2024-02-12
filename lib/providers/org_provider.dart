import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'org_provider.g.dart';

@Riverpod(keepAlive: true)
class Org extends _$Org {
  String? _value;

  @override
  String? build() => _value;

  void set(String? org) {
    _value = org;
  }
}
