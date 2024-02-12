import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../providers/policy_provider.dart';
import '../app_localizations.dart';
import '../widgets/sliver_markdown.dart';
import '../widgets/sliver_loading_message.dart';
import '../widgets/sliver_error_message.dart';

class SliverPrivacyPolicy extends HookConsumerWidget {
  const SliverPrivacyPolicy({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final t = AppLocalizations.of(context)!;

    return ref.watch(policyProvider).when(
          data: (data) => SliverMarkdown(data ?? '', onTapLink: onTapLink),
          error: (error, stackTrace) => SliverErrorMessage(
            error: error,
            stackTrace: stackTrace,
          ),
          loading: () => const SliverLoadingMessage(),
        );
  }
}
