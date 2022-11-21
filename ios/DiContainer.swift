//
//  DiContainer.swift
//  Wallet
//
//  Created by mvldev13 on 2022/11/14.
//

import Foundation

@objc(DiContainer)
class DiContainer: NSObject {
  
  private let settings: SettingsStorageProtocol
  
  init(settings: SettingsStorageProtocol) {
    self.settings = settings
  }
  
  @objc
  func getSettingsStorage() -> SettingsStorageProtocol {
    settings
  }

  @objc
  static let shared: DiContainer = DiContainer(settings: SettingsStorage())
}
