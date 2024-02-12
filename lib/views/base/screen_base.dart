import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../../../config.dart';
import '../../models/user.dart';
import '../../providers/me_provider.dart';
import '../../providers/ui_version_provider.dart';
import '../app_localizations.dart';
import '../widgets/sliver_error_message.dart';
import '../widgets/sliver_loading_message.dart';
import '../widgets/sliver_title.dart';
import 'sliver_header.dart';
import 'sliver_update_app.dart';
import 'sliver_footer.dart';

enum AppState { loading, loaded, user, admin }

class ScreenBase extends HookConsumerWidget {
  final AppState required;
  final List<Widget> slivers;

  const ScreenBase(this.slivers, this.required, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final t = AppLocalizations.of(context)!;
    final uiVersion = ref.watch(uiVersionProvider).value;
    final updateRequired = uiVersion != null && uiVersion != version;
    final sliversLoading = [
      const SliverLoadingMessage(),
    ];
    // final sliversAdminPrivError = [
    //   SliverErrorMessage(message: t.adminPrivRequired),
    // ];
    final sliversLogin = [
      SliverTitle(t.login),
    ];

    List<Widget> showSystemError(Object error, StackTrace stackTrace) => [
          SliverErrorMessage(error: error, stackTrace: stackTrace),
        ];

    List<Widget> guardLoading() =>
        required != AppState.loading ? sliversLoading : slivers;

    List<Widget> guardUser(User? user) =>
        ([AppState.user, AppState.admin].contains(required) && user == null)
            ? sliversLogin
            // : (required == AppState.admin && user?.admin != true)
            //     ? sliversAdminPrivError
            : slivers;

    return Scaffold(
      body: CustomScrollView(
        slivers: <Widget>[
          const SliverHeader(appTitle),
          if (updateRequired) const SliverUpdateApp(),
          ...ref.watch(uiVersionProvider).when(
                data: (_) => ref.watch(meProvider).when(
                      data: (user) => guardUser(user),
                      error: showSystemError,
                      loading: () => guardLoading(),
                    ),
                error: showSystemError,
                loading: () => guardLoading(),
              ),
          SliverFooter(t.copyright),
        ],
      ),
    );
  }
}
