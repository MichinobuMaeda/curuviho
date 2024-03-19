// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'firebase_firestore.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$confHash() => r'3486211f58e88f61ab605ab6e278808fa0429b82';

/// See also [conf].
@ProviderFor(conf)
final confProvider = StreamProvider<Conf>.internal(
  conf,
  name: r'confProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$confHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef ConfRef = StreamProviderRef<Conf>;
String _$usersHash() => r'ff2ad2dacb6d98c8ab2ffbf9e1cb608d82199616';

/// See also [users].
@ProviderFor(users)
final usersProvider = StreamProvider<List<User>>.internal(
  users,
  name: r'usersProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$usersHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef UsersRef = StreamProviderRef<List<User>>;
String _$myAccountHash() => r'1326878a45b2cd20d63cb7d66aa9e6f94af6cee2';

/// See also [myAccount].
@ProviderFor(myAccount)
final myAccountProvider = FutureProvider<Account?>.internal(
  myAccount,
  name: r'myAccountProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$myAccountHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef MyAccountRef = FutureProviderRef<Account?>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
