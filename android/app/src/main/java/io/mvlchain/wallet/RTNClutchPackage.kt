@file:JvmName("RTNClutchPackage")
package io.mvlchain.wallet

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import io.mvlchain.wallet.legacyauth.LegacyAuthManager
import io.mvlchain.wallet.settings.RTNSettingsModule

class RTNClutchPackage : ReactPackage {

    override fun createNativeModules(context: ReactApplicationContext): List<NativeModule> {
        return listOf(RTNSettingsModule(context), LegacyAuthManager(context))
    }

    override fun createViewManagers(
        context: ReactApplicationContext
    ): List<ViewManager<View, ReactShadowNode<*>>> {
        return emptyList()
    }
}
