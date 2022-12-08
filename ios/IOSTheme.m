//
//  IOSTheme.m
//  Wallet
//

#import "IOSTheme.h"
#import <CryptoVehicleWallet-Swift.h>
#import <React/RCTLog.h>

#import "ThemeType.h"

@implementation IOSTheme

+ (void)editThemeType:(UIUserInterfaceStyle)style {
  if (@available(iOS 13.0, *)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      // find a key window
      UIWindow *window = nil;
      for (UIWindow *w in [UIApplication sharedApplication].windows) {
        if (w.isKeyWindow) {
          window = w;
          break;
        }
      }
      
      UIUserInterfaceStyle style = [IOSTheme getThemeStyleByType];
      if (window != nil) {
        RCTLogInfo(@"Theme> found key window.");
        [window setOverrideUserInterfaceStyle:style];
      } else {
        RCTLogInfo(@"Theme> Cannot find root windows from iOS 13.0");
      }
    });
  }
}

/// @return: themeStyle parsed by themeType from SettingsStore.
+ (UIUserInterfaceStyle)getThemeStyleByType
{
  NSString *themeType = [[[DiContainer shared] getSettingsStorage] getStringValueFor:StorageKey.themeType];
  if (themeType == nil) {
    [[[DiContainer shared] getSettingsStorage]
     setStringValueFor:StorageKey.themeType
     value:kThemeTypeDefault];
    themeType = kThemeTypeDefault;
    RCTLogInfo(@"Theme> IOSTheme setting a default theme value: %@", themeType);
  }

  RCTLogInfo(@"Theme> IOSTheme.getThemeStyleByType is calling themeType: %@", themeType);

  return [IOSTheme parseThemeType:themeType];
}

+ (UIUserInterfaceStyle)parseThemeType:(NSString *)themeType {
  if ([themeType isEqualToString:kThemeTypeDefault]) {
    return UIUserInterfaceStyleUnspecified;
  } else if ([themeType isEqualToString:kThemeTypeDark]) {
    return UIUserInterfaceStyleDark;
  } else if ([themeType isEqualToString:kThemeTypeLight]) {
    return UIUserInterfaceStyleLight;
  } else {
    RCTLogInfo(@"Theme> Unable to parse: %@, returning default value", themeType);
    return UIUserInterfaceStyleLight;
  }
}

@end
