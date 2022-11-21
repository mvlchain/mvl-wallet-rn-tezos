//
//  IOSTheme.h
//  Wallet
//
//
#ifndef IOSTheme_h
#define IOSTheme_h

#import <UIKit/UIKit.h>

@interface IOSTheme : NSObject
+ (void)editThemeType:(UIUserInterfaceStyle)style;
+ (UIUserInterfaceStyle)getThemeStyleByType;
+ (UIUserInterfaceStyle)parseThemeType:(NSString *)themeType;
@end

#endif /* IOSTheme_h */
