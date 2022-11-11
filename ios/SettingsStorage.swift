//
//  SettingsStorage.swift
//  Wallet
//
//  Created by mvldev13 on 2022/11/11.
//

import Foundation

protocol SettingsStorageProtocol {
  func getStringValue(for key: String) -> String?
  func setStringValue(for key: String, value: String)
}

@objc(SettingsStorage)
class SettingsStorage: NSObject, SettingsStorageProtocol {
  
  private let userDefaults = UserDefaults.standard

  @objc
  func getStringValue(for key: String) -> String? {
    return userDefaults.string(forKey: key)
  }
  
  @objc
  func setStringValue(for key: String, value: String) {
    userDefaults.set(value, forKey: key)
  }
}
