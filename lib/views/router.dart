import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../providers/org_provider.dart';
import 'about/screen_about.dart';
import 'home/screen_home.dart';

GoRouter router(WidgetRef ref) {
  return GoRouter(
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
            pageBuilder: (context, state) {
              Future(() {
                ref.read(orgProvider.notifier).set(state.pathParameters['org']);
              });
              return NoTransitionPage(
                key: state.pageKey,
                child: const ScreenHome(),
              );
            },
          ),
        ],
      ),
    ],
    errorPageBuilder: (context, state) => NoTransitionPage(
      key: state.pageKey,
      child: const ScreenAbout(),
    ),
  );
}
