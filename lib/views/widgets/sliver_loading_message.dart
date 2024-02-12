import 'package:flutter/material.dart';

import '../../../config.dart';
import '../app_localizations.dart';

class SliverLoadingMessage extends StatelessWidget {
  final String? message;
  const SliverLoadingMessage({super.key, this.message});

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final thm = Theme.of(context);

    return SliverToBoxAdapter(
      child: Container(
        color: thm.colorScheme.surfaceVariant,
        height: scrollPaneHeightNarrow / 3,
        child: Center(
          child: Text(
            message ?? t.defaultLoadingMessage,
            style: TextStyle(
              color: thm.colorScheme.onSurfaceVariant,
            ),
          ),
        ),
      ),
    );
  }
}
