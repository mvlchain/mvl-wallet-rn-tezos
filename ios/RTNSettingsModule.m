//
//  RTNSettingsModule.m
//  Wallet
//

#import "RTNSettingsModule.h"
#import <Foundation/Foundation.h>
#import <CryptoVehicleWallet-Swift.h>
#import <React/RCTLog.h>
#import "ThemeType.h"
#import "IOSTheme.h"

@implementation RTNSettingsModule {
  SettingsStorage *settings;
}

- (id)init {
  self = [super init];
  if (self != nil) {
    settings = [SettingsStorage alloc];
  }
  return self;
}

+ (BOOL)requiresMainQueueSetup {
  // only do this if your module initialization relies on calling UIKit!
  return YES;
}

RCT_EXPORT_MODULE(RTNSettings);

RCT_EXPORT_METHOD(getThemeType:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *themeType = [[[DiContainer shared] getSettingsStorage] getStringValueFor:StorageKey.themeType];
  if (themeType == nil) {
    [settings setStringValueFor:StorageKey.themeType value:kThemeTypeDefault];
    themeType = kThemeTypeDefault;
    RCTLogInfo(@"Theme> RTNSettingsModule.setting a default value: %@", themeType);
  }
  
  RCTLogInfo(@"Theme> RTNSettingsModule.getThemeType called to get themeType: %@", themeType);
  resolve(themeType);
//  reject(@"event_failure", @"no event id returned", nil);
}

RCT_EXPORT_METHOD(putThemeType:(NSString *)themeType) {
  NSString *themeTypeValue = kThemeTypeDefault;
  if ([themeType isEqualToString:kThemeTypeDefault] ||
      [themeType isEqualToString:kThemeTypeLight] ||
      [themeType isEqualToString:kThemeTypeDark]) {
    themeTypeValue = themeType;
  } else {
    RCTLogInfo(@"Theme> RTNSettingsModule.putThemeType called with unsupported value: %@", themeType);
    themeTypeValue = kThemeTypeDefault;
  }
  
  // Save theme style to settings
  [[[DiContainer shared] getSettingsStorage]
   setStringValueFor:StorageKey.themeType
   value:themeTypeValue];
  
  // update views
  UIUserInterfaceStyle style = [IOSTheme parseThemeType:themeType];
  [IOSTheme editThemeType:style];
  
  RCTLogInfo(@"Theme> RTNSettingsModule.putThemeType args: %@, themeTypeValue: %@", themeType, themeTypeValue);
}

@end
