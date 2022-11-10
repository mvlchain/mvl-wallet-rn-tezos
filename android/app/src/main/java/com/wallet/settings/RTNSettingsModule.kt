package com.wallet.settings

import android.content.res.Configuration
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.appcompat.app.AppCompatDelegate
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.wallet.R

internal annotation class RTNErrorCodes {
    companion object {
        const val E_UNKNOWN_ERROR = "E_UNKNOWN_ERROR"
        const val E_NO_SUCH_PREFERENCE_KEY = "E_NO_SUCH_PREFERENCE_KEY"
    }
}

class RTNSettingsModule(
    context: ReactApplicationContext
) : ReactContextBaseJavaModule(context) {

    private val preferences = SharedPreferenceStorage(context.applicationContext)
    private val handler = Handler(Looper.getMainLooper())

    override fun getName(): String = "RTNSettings"

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun getThemeType(): String {
        return preferences.themeType
    }

    /**
     * @param themeType default, light, dark
     */
    @ReactMethod(isBlockingSynchronousMethod = true)
    fun putThemeType(@ThemeType themeType: String) {
        Log.d("Theme", "Theme> putThemeType called with an argument: $themeType")
        preferences.themeType = themeType

        handler.post {
            AndroidTheme.editThemeType(themeType)
        }
    }
}
