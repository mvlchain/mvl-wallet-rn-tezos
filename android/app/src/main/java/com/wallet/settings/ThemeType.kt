package com.wallet.settings

import androidx.annotation.StringDef

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
