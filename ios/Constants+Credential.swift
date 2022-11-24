//
//  Constants+Credential.swift
//  Wallet
//
//  Created by Gin Kim on 2022/11/24.
//


import CryptoSwift

extension Constants.Credential {
    enum AESCrypto {
        static let keyAES256 = "***REMOVED***"
        static let keyAES256IV = "***REMOVED***"
        static let cipher = try? AES(key: AESCrypto.keyAES256, iv: AESCrypto.keyAES256IV)
    }

    enum URLScheme {
        static let ***REMOVED*** = "***REMOVED***"
        static let tadadriver = "***REMOVED***"
        static let clutchwallet = "clutchwallet"
    }
}
