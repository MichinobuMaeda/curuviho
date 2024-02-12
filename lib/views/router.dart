import 'package:go_router/go_router.dart';

import 'about/screen_about.dart';
import 'home/screen_home.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      pageBuilder: (context, state) => NoTransitionPage(
        key: state.pageKey,
        child: const ScreenAbout(),
      ),
      routes: [
        GoRoute(
          path: ':org',
          pageBuilder: (context, state) => NoTransitionPage(
            key: state.pageKey,
            child: const ScreenHome(),
          ),
        ),
      ],
    ),
  ],
  errorPageBuilder: (context, state) => NoTransitionPage(
    key: state.pageKey,
    child: const ScreenAbout(),
  ),
);
