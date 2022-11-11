//
//  RTNSettingsModule.h
//  Wallet
//

#ifndef RTNSettingsModule_h
#define RTNSettingsModule_h

#import <React/RCTBridgeModule.h>

@interface RTNSettingsModule : NSObject <RCTBridgeModule>
- (id)init;
- (NSString *)getThemeType;
- (id)putThemeType:(NSString *)themeType;
@end

#endif /* RTNSettingsModule_h */
