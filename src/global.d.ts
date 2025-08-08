type ExistingWeb3UserContext = UserContext & {
    ethereum: {
        address: string // the address of the embedded wallet
        wallet: WalletClient // a Viem WalletClient
    } 
  }