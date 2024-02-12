import 'package:flutter/foundation.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

const maxLength = 512;

String valueToString(Object? value) {
  final str = (value is AsyncValue) ? '${value.value}' : '$value';
  return str.length > maxLength ? str.substring(0, maxLength) : str;
}

class ProviderLogger extends ProviderObserver {
  @override
  void didAddProvider(
    ProviderBase<Object?> provider,
    Object? value,
    ProviderContainer container,
  ) {
    debugPrint(
      '   added: [${provider.name}]'
      ' ${valueToString(value)}',
    );
  }

  @override
  void didUpdateProvider(
    ProviderBase<Object?> provider,
    Object? previousValue,
    Object? newValue,
    ProviderContainer container,
  ) {
    debugPrint(
      ' updated: [${provider.name}]'
      ' ${valueToString(previousValue)}'
      ' --> ${valueToString(newValue)}',
    );
  }

  @override
  void didDisposeProvider(
    ProviderBase<Object?> provider,
    ProviderContainer container,
  ) {
    debugPrint(
      ' disposed: [${provider.name}]',
    );
  }
}
