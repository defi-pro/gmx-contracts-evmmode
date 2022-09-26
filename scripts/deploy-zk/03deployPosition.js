const { getFrameSigner, deployContract, contractAt , sendTxn } = require("../shared/helpers")
const { expandDecimals } = require("../../test/shared/utilities")
const { toUsd } = require("../../test/shared/units")
const { errors } = require("../../test/core/Vault/helpers")

const {HARDHAT_NETWORK} = require("../../env.json")
//process.env.HARDHAT_NETWORK
const network = (HARDHAT_NETWORK || 'mainnet');

const tokens = require('./tokens')[network];

const {deployments} = require("./Deployed");


// TODO: set referral storage
async function main() {

  const depositFee = "30" // 0.3%
  const vault = await contractAt("Vault", deployments["Vault"])
  const router = await contractAt("Router", deployments["Router"])
  const weth = await contractAt("WETH", tokens.nativeToken.address)
  const orderBook = await contractAt("OrderBook", deployments["OrderBook"])
  
  //PositionManager part
  const orderKeeper = { address: "0x11E97A2E87Ad623694aAcC46359983116D4DdE0C" }
  const liquidator = { address: "0x11E97A2E87Ad623694aAcC46359983116D4DdE0C" }
 

  const partnerContracts = [];  
  const positionManager = await deployContract("PositionManager", [vault.address, router.address, weth.address, depositFee, orderBook.address])
  await sendTxn(positionManager.setOrderKeeper(orderKeeper.address, true), "positionManager.setOrderKeeper(orderKeeper)")
  await sendTxn(positionManager.setLiquidator(liquidator.address, true), "positionManager.setLiquidator(liquidator)")
  //// await sendTxn(timelock.setContractHandler(positionManager.address, true), "timelock.setContractHandler(positionRouter)")
  //// await sendTxn(timelock.setLiquidator(vault.address, positionManager.address, true), "timelock.setLiquidator(vault, positionManager, true)")
  await sendTxn(router.addPlugin(positionManager.address), "router.addPlugin(positionManager)")
  
  //PositionRouter part
  const minExecutionFee = "300000000000000" // 0.0003 ETH

  const positionRouter = await deployContract("PositionRouter", [vault.address, router.address, weth.address, depositFee, minExecutionFee], "PositionRouter")

  ////await sendTxn(positionRouter.setReferralStorage(referralStorage.address), "positionRouter.setReferralStorage")
  ////await sendTxn(referralStorage.setHandler(positionRouter.address, true), "referralStorage.setHandler(positionRouter)")

  await sendTxn(router.addPlugin(positionRouter.address), "router.addPlugin")

  await sendTxn(positionRouter.setDelayValues(1, 180, 30 * 60), "positionRouter.setDelayValues")

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
