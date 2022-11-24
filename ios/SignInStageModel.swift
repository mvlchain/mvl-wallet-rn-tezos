//
//  SignInStageModel.swift
//  Wallet
//
//  Created by Gin Kim on 2022/11/24.
//

struct SignInStageModel: Codable {
    var authStage: AuthStage

    // Use to show home or back up seed phrase in SetPINViewModel
    // Account will be set true when signing up in AuthGuideViewModel
    var isAccountExists: Bool
}

extension SignInStageModel {
    enum AuthStage: Codable {
        case torusSocialAuth
        case termsOfService
        case pinSetUp
        case backUpSeedPhrase
        case home
    }
}
