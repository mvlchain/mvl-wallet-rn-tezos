//
//  UserSessionRepository.swift
//  Wallet
//
//  Created by Gin Kim on 2022/11/24.
//

import Foundation
import RxSwift

struct UserSessionRepository: UserSessionRepositoryProtocol {

    private let keychain: KeychainProtocol

    init(keychain: KeychainProtocol) {
        self.keychain = keychain
    }

    func getDeviceShare() -> Single<String> {
        Single.create { observer in
            do {
                if let dsKey = try keychain.get(.dsKey) {
                    observer(.success(dsKey))
                } else {
                    observer(.failure(WalletError.local("There is no data")))
                }
            } catch {
                observer(.failure(error))
            }
            return Disposables.create()
        }
    }

    func getIsSignedIn() -> Single<Bool> {
        Single.create { observer in
            do {
                if try keychain.get(.dsKey) != nil,
                   try keychain.get(.torusCredential) != nil,
                   try keychain.get(.extendedKey) != nil {
                    observer(.success(true))
                } else {
                    observer(.success(false))
                }
            } catch {
                observer(.failure(error))
            }
            return Disposables.create()
        }
    }

    func getTorusCredential() -> Single<TorusCredentialModel> {
        Single.create { observer in
            if let torusCredential = try? keychain.get(.torusCredential) {
                observer(.success(torusCredential))
            } else {
                observer(.failure(WalletError.local("There is no data")))
            }
            return Disposables.create()
        }
    }

    func getPIN() -> Single<String> {
        Single.create { observer in
            do {
                if let pin = try keychain.get(.pin) {
                    observer(.success(pin))
                } else {
                    observer(.failure(WalletError.local("There is no data")))
                }
            } catch {
                observer(.failure(error))
            }
            return Disposables.create()
        }
    }

    func savePIN(_ pin: String) -> Completable {
        Completable.create { observer in
            do {
                try keychain.set(pin, for: .pin)
            } catch {
                observer(.error(error))
            }
            observer(.completed)
            return Disposables.create()
        }
    }

    func getExtendedKey() -> Single<ExtendedKeyModel> {
        Single.create { observer in
            do {
                if let extendedKey = try keychain.get(.extendedKey) {
                    observer(.success(extendedKey))
                } else {
                    observer(.failure(WalletError.local("There is no data")))
                }
            } catch {
                observer(.failure(error))
            }
            return Disposables.create()
        }
    }

    func saveCredentialKeys(
        deviceShare: String, torusCredential: TorusCredentialModel, extendedKey: ExtendedKeyModel
    ) -> Completable {
        Completable.create { observer in
            do {
                try keychain.set(deviceShare, for: .dsKey)
                try keychain.set(torusCredential, for: .torusCredential)
                try keychain.set(extendedKey, for: .extendedKey)
            } catch {
                observer(.error(error))
            }
            observer(.completed)
            return Disposables.create()
        }
    }

    func clearCache() -> Completable {
        Completable.create { observer in
            do {
                try keychain.remove(.pin)
                try keychain.remove(.dsKey)
                try keychain.remove(.torusCredential)
                try keychain.remove(.extendedKey)
                try keychain.remove(.signInStage)
            } catch {
                observer(.error(error))
            }
            observer(.completed)
            return Disposables.create()
        }
    }

    func getSignInStage() -> Single<SignInStageModel> {
        Single.create { observer in
            if let stage = try? keychain.get(.signInStage) {
                observer(.success(stage))
            } else {
                observer(.failure(WalletError.local("There is no data")))
            }
            return Disposables.create()
        }
    }

    func saveSignInStage(_ stage: SignInStageModel) -> Single<SignInStageModel> {
        Single.create { observer in
            do {
                try keychain.set(stage, for: .signInStage)
                observer(.success(stage))
            } catch {
                observer(.failure(error))
            }
            return Disposables.create()
        }
    }
}

