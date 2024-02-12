import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../config.dart';

class SliverVersion extends HookConsumerWidget {
  const SliverVersion({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const SliverToBoxAdapter(
      child: SizedBox(
        height: 32,
        child: Center(
          child: Text('Version: $version'),
        ),
      ),
    );
  }
}
