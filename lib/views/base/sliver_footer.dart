import 'package:flutter/material.dart';

class SliverFooter extends StatelessWidget {
  final String copyright;
  const SliverFooter(this.copyright, {super.key});

  @override
  Widget build(BuildContext context) {
    final thm = Theme.of(context);

    return SliverFillRemaining(
      hasScrollBody: false,
      child: Container(
        color: thm.colorScheme.background,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Text(
            copyright,
            style: TextStyle(
              color: thm.colorScheme.primary,
            ),
          ),
        ),
      ),
    );
  }
}
