import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:universal_html/html.dart' as html;

bool isWeb() => kIsWeb;

void updateAppImpl() {
  if (isWeb()) {
    html.window.location.reload();
  } else {
    assert(false);
  }
}
