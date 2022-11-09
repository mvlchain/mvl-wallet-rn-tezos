package com.wallet.settings

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext

private const val LOCAL_PREFERENCE_NAME = "local_preference_name"

val ReactApplicationContext.preferences: SharedPreferences
    get() = getSharedPreferences(LOCAL_PREFERENCE_NAME, Context.MODE_PRIVATE)
