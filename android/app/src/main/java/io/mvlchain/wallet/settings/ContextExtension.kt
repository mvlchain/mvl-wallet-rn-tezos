package io.mvlchain.wallet.settings

import android.content.Context
import android.content.SharedPreferences

private const val LOCAL_PREFERENCE_NAME = "local_preference_name"

val Context.preferences: SharedPreferences
    get() = getSharedPreferences(LOCAL_PREFERENCE_NAME, Context.MODE_PRIVATE)
