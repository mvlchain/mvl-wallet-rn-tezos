package com.wallet.settings

import android.content.Context

interface PreferenceStorage {
    @ThemeType
    var themeType: String
}

class SharedPreferenceStorage constructor(
    context: Context
) : PreferenceStorage {

    private val preferences = context.preferences

    @ThemeType
    override var themeType: String
        get() {
            return preferences.getString(PREFS_THEME, THEME_TYPE_DEFAULT)
                ?: throw NoSuchElementException()
        }
        set(value) {
            with (preferences.edit()) {
                putString(PREFS_THEME, value)
                apply()
            }
        }

    companion object {
        const val PREFS_THEME = "PREFS_THEME"
    }
}
