package com.wallet.settings

import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

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

    @ReactMethod
    fun getThemeType(promise: Promise) {
        try {
            promise.resolve(preferences.themeType)
        } catch (e: Throwable) {
            promise.reject("getTheme err", e)
        }
    }

    /**
     * @param themeType default, light, dark
     */
    @ReactMethod
    fun putThemeType(@ThemeType themeType: String) {
        Log.d("Theme", "Theme> putThemeType called with an argument: $themeType")
        preferences.themeType = themeType

        handler.post {
            AndroidTheme.editThemeType(themeType)
        }
    }
}
