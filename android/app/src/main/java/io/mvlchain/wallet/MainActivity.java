package io.mvlchain.wallet;

import static io.mvlchain.wallet.settings.AndroidThemeKt.THEME_TYPE_DARK;
import static io.mvlchain.wallet.settings.AndroidThemeKt.THEME_TYPE_DEFAULT;
import static io.mvlchain.wallet.settings.AndroidThemeKt.THEME_TYPE_LIGHT;

import android.os.Bundle;
import android.util.Log;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import io.mvlchain.wallet.BuildConfig;
import io.mvlchain.wallet.R;

import io.mvlchain.wallet.settings.AndroidTheme;
import io.mvlchain.wallet.settings.SharedPreferenceStorage;
import io.mvlchain.wallet.settings.ThemeType;

public class MainActivity extends ReactActivity {
  private static final String OPTION_FOX_CODE = "foxCode";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SharedPreferenceStorage preference = new SharedPreferenceStorage(getApplicationContext());

    @ThemeType
    String themeType = preference.getThemeType();

    AndroidTheme.editThemeType(themeType);

    int themeStyle = getThemeStyleByType(themeType);
    setTheme(themeStyle);
    org.devio.rn.splashscreen.SplashScreen.show(this, getSplashDialogTheme(themeStyle), true);

    // api >= 31
    //androidx.core.splashscreen.SplashScreen.installSplashScreen(this);

    super.onCreate(null);
    Log.d("Theme", "isDarkMode: " + AndroidTheme.isDarkMode(this) + " after onCreate called");
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Wallet";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  private int getThemeStyleByType(@ThemeType String themeType) {
    int themeStyle = -1;
    switch (themeType) {
      case THEME_TYPE_DEFAULT:
        boolean isDarkMode = AndroidTheme.isDarkMode(this);
        if (isDarkMode) {
          themeStyle = R.style.DarkTheme;
        } else {
          themeStyle = R.style.LightTheme;
        }
        break;

      case THEME_TYPE_DARK:
        themeStyle = R.style.DarkTheme;
        break;

      case THEME_TYPE_LIGHT:
      default:
        themeStyle = R.style.LightTheme;
        break;
    }
    return themeStyle;
  }

  private int getSplashDialogTheme(int themeStyle) {
    if (themeStyle == R.style.DarkTheme) {
      return R.style.SplashDarkTheme;
    }
    return R.style.SplashLightTheme;
  }

  private void applyThemeStyle(@ThemeType String themeType, int themeStyle) {
    AndroidTheme.editThemeType(themeType);
    setTheme(themeStyle);
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Nullable
    @Override
    protected Bundle getLaunchOptions() {
      Bundle options = new Bundle();
      options.putString(OPTION_FOX_CODE, BuildConfig.FOX_CODE);
      return options;
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
