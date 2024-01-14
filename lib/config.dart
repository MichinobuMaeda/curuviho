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

// Assets
const String fontNameNotoSans = 'NotoSans';
const assetImageLogo = AssetImage('assets/images/logo-192.png');

// Style
const themeMode = ThemeMode.system;
const seedColor = Color.fromARGB(255, 85, 107, 47);
const defaultFontFamily = fontNameNotoSans;

final theme = ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: seedColor),
  fontFamily: defaultFontFamily,
  useMaterial3: true,
);

final darkTheme = theme.copyWith(
  colorScheme: ColorScheme.fromSeed(
    seedColor: seedColor,
    brightness: Brightness.dark,
  ),
);
