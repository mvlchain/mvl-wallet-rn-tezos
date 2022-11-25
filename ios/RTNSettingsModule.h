//
//  RTNSettingsModule.h
//  Wallet
//

#ifndef RTNSettingsModule_h
#define RTNSettingsModule_h

#import <React/RCTBridgeModule.h>

@interface RTNSettingsModule : NSObject <RCTBridgeModule>
- (id)init;
- (void)getThemeType:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;
- (void)putThemeType:(NSString *)themeType;
@end

#endif /* RTNSettingsModule_h */
