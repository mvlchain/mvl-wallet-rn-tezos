package io.mvlchain.wallet.settings

import android.content.res.Configuration
import androidx.annotation.StringDef
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate

const val THEME_TYPE_DEFAULT = "default"
const val THEME_TYPE_LIGHT = "light"
const val THEME_TYPE_DARK = "dark"

@Retention(AnnotationRetention.SOURCE)
@StringDef(
    value = [
        THEME_TYPE_DEFAULT,
        THEME_TYPE_LIGHT,
        THEME_TYPE_DARK
    ]
)
annotation class ThemeType


object AndroidTheme {
    @JvmStatic
    fun editThemeType(@ThemeType themeType: String) {
        val nightMode = when (themeType) {
            THEME_TYPE_DEFAULT -> AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
            THEME_TYPE_DARK -> AppCompatDelegate.MODE_NIGHT_YES
            THEME_TYPE_LIGHT -> AppCompatDelegate.MODE_NIGHT_NO
            else -> AppCompatDelegate.MODE_NIGHT_NO
        }
        AppCompatDelegate.setDefaultNightMode(nightMode)
    }

    @JvmStatic
    fun isDarkMode(activity:  AppCompatActivity): Boolean {
        return activity.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK ==
            Configuration.UI_MODE_NIGHT_YES
    }
}