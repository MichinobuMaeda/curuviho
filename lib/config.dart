import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';

const String appTitle = "APP_TITLE";

// UI version replaced with 'version' in pubspec.yaml
const String version = 'for test';

// Licenses to be added manually
const List<List<String>> licenseAssets = [
  // [text, product1, product2, ...]
  ['LICENSE', 'curuviho'],
  ['assets/fonts/OFL.txt', 'Noto Sans JP'],
];

// Assets
const String fontNameNotoSans = 'NotoSans';
const assetImageLogo = AssetImage('assets/images/logo-192.png');

// Firebase
const FirebaseOptions firebaseOptions = FirebaseOptions(
  apiKey: 'FIREBASE_API_KEY',
  authDomain: "curuviho.firebaseapp.com",
  projectId: "curuviho",
  storageBucket: "curuviho.appspot.com",
  messagingSenderId: "913047262722",
  appId: "1:913047262722:web:db01455e661c6046df791b",
  measurementId: "G-NKBCK0LNBW",
);
const String webRecaptchaSiteKey = '6LfR-kMpAAAAAPjFlevQiCuCQxBN8Vv2QFVJFvwO';

// Style
const themeMode = ThemeMode.system;
const seedColor = Color.fromARGB(255, 85, 107, 47);
const defaultFontFamily = fontNameNotoSans;

Color stripedBackground(BuildContext context, int index) => index.isOdd
    ? Theme.of(context).colorScheme.surfaceVariant
    : Theme.of(context).colorScheme.background;

Color linkColor(BuildContext context) =>
    Theme.of(context).brightness == Brightness.light
        ? Colors.blue.shade800
        : Colors.lightBlue.shade300;

const textTheme = TextTheme(
  bodySmall: TextStyle(fontSize: 14),
  bodyMedium: TextStyle(fontSize: 18),
  bodyLarge: TextStyle(fontSize: 20),
);

// const buttonStyle = ButtonStyle(
//   textStyle: MaterialStatePropertyAll<TextStyle>(
//     TextStyle(fontSize: 20, fontFamily: defaultFontFamily),
//   ),
// );

const edgeInsetsInnerScrollPane = EdgeInsets.symmetric(
  vertical: 4,
  horizontal: 16,
);

const scrollPaneHeightNarrow = 128.0;
const scrollPaneHeightWide = 256.0;

final theme = ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: seedColor),
  fontFamily: defaultFontFamily,
  useMaterial3: true,
  textTheme: textTheme,
//   elevatedButtonTheme: const ElevatedButtonThemeData(style: buttonStyle),
//   filledButtonTheme: const FilledButtonThemeData(style: buttonStyle),
//   outlinedButtonTheme: const OutlinedButtonThemeData(style: buttonStyle),
//   textButtonTheme: const TextButtonThemeData(style: buttonStyle),
);

final darkTheme = theme.copyWith(
  colorScheme: ColorScheme.fromSeed(
    seedColor: seedColor,
    brightness: Brightness.dark,
  ),
);
