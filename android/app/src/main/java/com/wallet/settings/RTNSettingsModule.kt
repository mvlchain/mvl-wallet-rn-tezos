package com.wallet.settings

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

    private val preferences = SharedPreferenceStorage(context)

    override fun getName(): String = "RTNSettings"

    @ReactMethod
    fun getThemeType(promise: Promise) {
        try {
            val themeType = preferences.themeType
            promise.resolve(themeType)
        } catch (e: NoSuchElementException) {
            promise.reject(RTNErrorCodes.E_NO_SUCH_PREFERENCE_KEY, e)
        } catch (e: Throwable) {
            promise.reject(RTNErrorCodes.E_UNKNOWN_ERROR, e)
        }
    }
}
