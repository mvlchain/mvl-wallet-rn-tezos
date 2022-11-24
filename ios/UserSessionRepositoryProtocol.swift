//
//  UserSessionRepositoryProtocol.swift
//  Wallet
//
//  Created by Gin Kim on 2022/11/24.
//

import RxSwift

protocol UserSessionRepositoryProtocol {
    func getDeviceShare() -> Single<String>
    func getIsSignedIn() -> Single<Bool>
    func getTorusCredential() -> Single<TorusCredentialModel>
    func getPIN() -> Single<String>
    func savePIN(_ pin: String) -> Completable
    func getExtendedKey() -> Single<ExtendedKeyModel>
    func saveCredentialKeys(
        deviceShare: String, torusCredential: TorusCredentialModel, extendedKey: ExtendedKeyModel
    ) -> Completable
    func clearCache() -> Completable
}
