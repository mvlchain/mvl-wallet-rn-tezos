//
//  TorusCredentialModel.swift
//  Wallet
//
//  Created by Gin Kim on 2022/11/24.
//

struct TorusCredentialModel: Codable, Equatable {
    let postboxKey: String // This is 'private key' in response of torus signin.
    let userIdentifier: String // identifier of google or apple signin result
    let idToken: String
    let signInProvider: SocialSignInProvider
}
