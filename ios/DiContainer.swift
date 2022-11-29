//
//  DiContainer.swift
//  Wallet
//
//  Created by mvldev13 on 2022/11/14.
//

import Foundation

@objc(DiContainer)
class DiContainer: NSObject {
  private let keychain: KeychainProtocol
  private let settings: SettingsStorageProtocol
  
  init(settings: SettingsStorageProtocol, keychain: KeychainProtocol) {
    self.settings = settings
    self.keychain = keychain
  }
  
  @objc
  func getSettingsStorage() -> SettingsStorageProtocol {
    settings
  }

  @objc
  static let shared: DiContainer = DiContainer(settings: SettingsStorage(), keychain: Keychain.default)
}
