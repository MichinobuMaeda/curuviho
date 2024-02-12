import 'package:flutter/material.dart';

class SliverTitle extends StatelessWidget {
  final String title;
  const SliverTitle(this.title, {super.key});

  @override
  Widget build(BuildContext context) {
    final thm = Theme.of(context);

    return SliverToBoxAdapter(
      child: Container(
        color: thm.colorScheme.primaryContainer,
        height: 64,
        child: Center(
          child: Text(
            title,
            style: thm.textTheme.headlineMedium?.copyWith(
              color: thm.colorScheme.primary,
            ),
          ),
        ),
      ),
    );
  }
}
