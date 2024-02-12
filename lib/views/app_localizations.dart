import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import '../../config.dart';

class AppLocalizations {
  AppLocalizations() : localeName = intl.Intl.canonicalizedLocale('ja');

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[Locale('ja')];

  String get title => appTitle;
  String get login => "ログイン";
  String get home => "ホーム";
  String get aboutThisApp => "このアプリについて";
  String get privacyPolicy => "プライバシーポリシー";
  String get licenses => "ライセンス";
  String get defaultLoadingMessage => "データ受信中 ...";
  String get defaultErrorMessage => "エラー";
  String get updateThisApp => "アプリを更新する";
  String get adminPrivRequired => "管理者権限が必要です。";
  String get copyright => "© 2024 Michinobu Maeda";
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['ja'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  return AppLocalizations();
}
