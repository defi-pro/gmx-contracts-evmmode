const {POLYGON_DEPLOY_KEY,ZKSYNC_V2_DEPLOY_KEY} = require("./keys.json");
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-contract-sizer")
require('@typechain/hardhat')
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");

const {
  BSC_URL,
  BSC_DEPLOY_KEY,
  BSCSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
  SNOWTRACE_API_KEY,
  ARBISCAN_API_KEY,
  ETHERSCAN_API_KEY,
  BSC_TESTNET_URL,
  BSC_TESTNET_DEPLOY_KEY,
  ARBITRUM_TESTNET_DEPLOY_KEY,
  ARBITRUM_TESTNET_URL,
  ARBITRUM_DEPLOY_KEY,
  ARBITRUM_URL,
  AVAX_DEPLOY_KEY,
  AVAX_URL,
  POLYGON_URL,
  MAINNET_URL,
  MAINNET_DEPLOY_KEY
} = require("./env.json")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.info(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      zksync: true
    },
    bsc: {
      url: BSC_URL,
      chainId: 56,
      gasPrice: 10000000000,
      accounts: [BSC_DEPLOY_KEY]
    },
    testnet: {
      url: BSC_TESTNET_URL,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [BSC_TESTNET_DEPLOY_KEY]
    },
    arbitrumTestnet: {
      url: ARBITRUM_TESTNET_URL,
      gasPrice: 10000000000,
      chainId: 421611,
      accounts: [ARBITRUM_TESTNET_DEPLOY_KEY]
    },
    arbitrum: {
      url: ARBITRUM_URL,
      gasPrice: 30000000000,
      chainId: 42161,
      accounts: [ARBITRUM_DEPLOY_KEY]
    },
    avax: {
      url: AVAX_URL,
      gasPrice: 100000000000,
      chainId: 43114,
      accounts: [AVAX_DEPLOY_KEY]
    },
    polygon: {
      url: POLYGON_URL,
      gasPrice: 100000000000,
      chainId: 137,
      accounts: [POLYGON_DEPLOY_KEY]
    },
    mainnet: {
      url: MAINNET_URL,
      gasPrice: 50000000000,
      accounts: [MAINNET_DEPLOY_KEY]
    }
  },
  etherscan: {
    apiKey: {
      mainnet: MAINNET_DEPLOY_KEY,
      arbitrumOne: ARBISCAN_API_KEY,
      avalanche: SNOWTRACE_API_KEY,
      bsc: BSCSCAN_API_KEY,
      polygon: POLYGONSCAN_API_KEY,
    }
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        //enabled: true,//`optimizer` setting is deprecated, optimizer is always enabled
        runs: 100
      }
    }
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  zksolc: {
    version: "1.2.0",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,//`optimizer` setting is deprecated, optimizer is always enabled
        //runs: 10 //  This contract may not be deployable on mainnet. Consider enabling the optimizer (with a low "runs" value!)
        /* fULL ERROR
        contracts/peripherals/Timelock.sol:24:1: Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon).
         This contract may not be deployable on mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.
        contract Timelock is ITimelock {
        ^ (Relevant source part starts here and spans across multiple lines).*/
      },
      experimental: {

      },
    },
  },
  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: "goerli", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
  },
}
