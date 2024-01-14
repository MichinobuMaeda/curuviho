import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:firebase_app_check/firebase_app_check.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'config.dart';
import 'logger.dart';

void main() async {
  const bool isTest = version == 'for test';
  debugPrint('Test mode: $isTest');

  debugPrint('Adding licenses manually.');
  for (var entry in licenseAssets) {
    LicenseRegistry.addLicense(() async* {
      yield LicenseEntryWithLineBreaks(
        entry.sublist(1),
        await rootBundle.loadString(entry[0]),
      );
    });
  }

  WidgetsFlutterBinding.ensureInitialized();

  debugPrint('Initializing Firebase.');
  () async {
    await Firebase.initializeApp(options: firebaseOptions);

    if (isTest) {
      await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
      FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
      await FirebaseStorage.instance.useStorageEmulator('localhost', 9199);
      FirebaseFunctions.instance.useFunctionsEmulator('localhost', 5001);
    } else {
      await FirebaseAppCheck.instance.activate(
        webProvider: ReCaptchaV3Provider(webRecaptchaSiteKey),
        // androidProvider: AndroidProvider.debug,
        // appleProvider: AppleProvider.appAttest,
      );
    }
    debugPrint("Initialized Firebase.");
  }();

  debugPrint("Show Widgets.");
  runApp(
    ProviderScope(
      observers: [
        if (isTest) ProviderLogger(),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      theme: theme,
      darkTheme: darkTheme,
      themeMode: themeMode,
      home: const MyHomePage(title: appTitle),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key, required this.title});
  final String title;
  final int _counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => {},
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
