import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../config.dart';

class SliverLogo extends HookConsumerWidget {
  const SliverLogo({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const SliverToBoxAdapter(
      child: SizedBox(
        height: 144,
        child: Center(
          child: Padding(
            padding: EdgeInsets.all(4),
            child: Image(image: assetImageLogo),
          ),
        ),
      ),
    );
  }
}
