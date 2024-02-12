import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../config.dart';

void onTapLink(String text, String? href, String? title) {
  if (href != null) {
    launchUrl(Uri.parse(href));
  }
}

MarkdownStyleSheet markdownStyleSheet(BuildContext context) =>
    MarkdownStyleSheet(
      p: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      h1: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      h2: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      h3: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      h4: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      h5: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      h6: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      code: TextStyle(color: Theme.of(context).colorScheme.onBackground),
      a: TextStyle(color: linkColor(context)),
    );

class SliverMarkdown extends StatelessWidget {
  final String data;
  final void Function(String, String?, String)? onTapLink;

  const SliverMarkdown(this.data, {super.key, this.onTapLink});

  @override
  Widget build(BuildContext context) {
    final thm = Theme.of(context);

    return SliverToBoxAdapter(
      child: Container(
        padding: edgeInsetsInnerScrollPane,
        color: thm.colorScheme.background,
        height: scrollPaneHeightNarrow,
        child: Markdown(
          data: data,
          onTapLink: onTapLink,
          padding: const EdgeInsets.all(0),
          styleSheet: markdownStyleSheet(context),
        ),
      ),
    );
  }
}
