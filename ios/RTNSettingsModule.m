//
//  RTNSettingsModule.m
//  Wallet
//

#import "RTNSettingsModule.h"
#import <Foundation/Foundation.h>
#import <Wallet-Swift.h>
#import <React/RCTLog.h>
#import "ThemeType.h"

@implementation RTNSettingsModule {
  SettingsStorage *settings;
}

- (id)init {
  self = [super init];
  if (self != nil) {
    //settings = [SettingsStorage alloc];
  }
  return self;
}

RCT_EXPORT_MODULE(RTNSettings);

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString*, getThemeType) {
  NSString* themeType = [settings getStringValueFor:StorageKey.themeType];
  if (themeType == nil) {
    [settings setStringValueFor:StorageKey.themeType value:kThemeTypeDefault];
    themeType = kThemeTypeDefault;
    RCTLogInfo(@"Darby> RTNSettingsModule.setting a default value: %@", themeType);
  }
  
  RCTLogInfo(@"Darby> RTNSettingsModule.getThemeType called to get themeType: %@", themeType);
  return themeType;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(putThemeType:(NSString *)themeType) {
  RCTLogInfo(@"Darby> RTNSettingsModule.putThemeType args: %@", themeType);
  
  NSString *themeTypeValue = kThemeTypeDefault;
  if ([themeType isEqualToString:kThemeTypeDefault] ||
      [themeType isEqualToString:kThemeTypeLight] ||
      [themeType isEqualToString:kThemeTypeDark]) {
    themeTypeValue = themeType;
  } else {
    RCTLogInfo(@"Darby> RTNSettingsModule.putThemeType called with unsupported value: %@", themeType);
    themeTypeValue = kThemeTypeDefault;
  }

  [settings setStringValueFor:StorageKey.themeType value:themeTypeValue];
  return self;
}

@end
