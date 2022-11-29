//
//  WalletError.swift
//  Wallet
//
//  Created by Gin Kim on 2022/11/24.
//

import Foundation

enum WalletError: LocalizedError, Equatable {
    case generic
    case local(String)

    var errorDescription: String? {
        switch self {
        case .generic: return "Something went wrong."
        case .local(let message):
            return message
        }
    }
}
