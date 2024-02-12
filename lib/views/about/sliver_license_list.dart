import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../config.dart';
import '../../../providers/license_entries_provider.dart';
import '../widgets/sliver_error_message.dart';
import '../widgets/sliver_loading_message.dart';

class SliverLicenseList extends HookConsumerWidget {
  const SliverLicenseList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final thm = Theme.of(context);
    return ref.watch(licenseEntryProvider).when(
          data: (licenseEntries) => SliverList(
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) => Container(
                padding: edgeInsetsInnerScrollPane,
                color: stripedBackground(context, index),
                height: scrollPaneHeightNarrow,
                child: SingleChildScrollView(
                  scrollDirection: Axis.vertical,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        licenseEntries[index].title,
                        style: TextStyle(
                          color: thm.colorScheme.primary,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        licenseEntries[index].body,
                        style: TextStyle(
                          color: thm.colorScheme.onBackground,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              childCount: licenseEntries.length,
            ),
          ),
          error: (error, stackTrace) => SliverErrorMessage(
            error: error,
            stackTrace: stackTrace,
          ),
          loading: () => const SliverLoadingMessage(),
        );
  }
}
