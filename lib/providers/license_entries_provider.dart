import 'package:flutter/foundation.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'license_entries_provider.g.dart';

class LicenseEntry {
  final String title;
  final String body;
  const LicenseEntry(this.title, this.body);
}

@Riverpod(keepAlive: true)
Future<List<LicenseEntry>> licenseEntry(LicenseEntryRef ref) async {
  List<LicenseEntry> entries = [];

  await for (final entry in LicenseRegistry.licenses) {
    entries.add(LicenseEntry(
      entry.packages.toList().join(', '),
      entry.paragraphs.toList().map((p) => p.text.trim()).join('\n\n'),
    ));
  }

  return entries;
}
