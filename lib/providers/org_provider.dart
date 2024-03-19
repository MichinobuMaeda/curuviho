import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'org_provider.g.dart';

@Riverpod(keepAlive: true)
class Org extends _$Org {
  @override
  String? build() => null;

  void set(String? org) {
    if (org != null && state != org) {
      state = org;
      Future(() async {
        final SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString('org', org);
      });
    }
  }
}
