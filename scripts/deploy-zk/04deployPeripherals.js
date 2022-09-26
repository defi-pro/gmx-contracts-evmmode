const { deployContract, contractAt ,writeTmpAddresses} = require("../shared/helpers")

const {deployments} = require("./Deployed");

async function main() {
  const balanceUpdater= await deployContract("BalanceUpdater", []);
  const batchSender = await deployContract("BatchSender", []);
  const orderBookReader = await deployContract("OrderBookReader", [])
  const reader = await deployContract("Reader", [], "Reader")
  // THIIS IS USED ON AVAX, (check if is needed)
  // its SET  hasMaxGlobalShortSizes TO TRUE:
  //await sendTxn(reader.setConfig(true), "Reader.setConfig")
  const rewardReader = await deployContract("RewardReader", [], "RewardReader")
  const vaultReader = await deployContract("VaultReader", [], "VaultReader")

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
