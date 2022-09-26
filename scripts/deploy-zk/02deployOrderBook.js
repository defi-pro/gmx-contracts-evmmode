const { deployContract, contractAt , sendTxn, writeTmpAddresses } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")

const {HARDHAT_NETWORK} = require("../../env.json")
//process.env.HARDHAT_NETWORK
const network = (HARDHAT_NETWORK || 'mainnet');
const tokens = require('./tokens')[network];

const {deployments} = require("./Deployed");

async function main() {
  const { nativeToken } = tokens

  const orderBook = await deployContract("OrderBook", []);

  // Polygon mainnet addresses
  await sendTxn(orderBook.initialize(
    deployments["Router"], // router
    deployments["Vault"], // vault
    nativeToken.address, // weth
    deployments["USDG"], // usdg
    "10000000000000000", // 0.01 MATIC
    expandDecimals(10, 30) // min purchase token amount usd
  ), "orderBook.initialize");

  writeTmpAddresses({
    orderBook: orderBook.address
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
