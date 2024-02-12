import 'package:flutter/material.dart';

import '../../../config.dart';
import '../app_localizations.dart';

class SliverErrorMessage extends StatelessWidget {
  final String? message;
  final Object? error;
  final StackTrace? stackTrace;
  const SliverErrorMessage({
    super.key,
    this.error,
    this.stackTrace,
    this.message,
  });

  @override
  Widget build(BuildContext context) {
    final t = AppLocalizations.of(context)!;
    final thm = Theme.of(context);

    return SliverToBoxAdapter(
      child: Container(
        padding: edgeInsetsInnerScrollPane,
        color: thm.colorScheme.errorContainer,
        height: scrollPaneHeightWide,
        child: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Text(
            [
              message ?? t.defaultErrorMessage,
              error.toString(),
              stackTrace.toString(),
            ].join('\n\n'),
            style: TextStyle(
              color: thm.colorScheme.error,
            ),
          ),
        ),
      ),
    );
  }
}
