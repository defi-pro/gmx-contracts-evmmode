# Just Futures

## Install Dependencies
If npx is not installed yet:
`npm install -g npx`

Install packages:
`npm i`

## Compile Contracts
`npx hardhat compile`

## Deploy the Contracts

The scripts to deploy in zksync EVM network are in **scripts/deploy-zk/**

Yo need to run the scripts and fill the **scripts/deploy-zk/Deployed.js** manually:

```
npx hardhat --network zksync_v2  run  scripts/deploy-zk/01deployVault.js 
npx hardhat --network zksync_v2  run  scripts/deploy-zk/02deployOrderBook.js 
npx hardhat --network zksync_v2  run  scripts/deploy-zk/03deployPosition.js 
npx hardhat --network zksync_v2  run  scripts/deploy-zk/04deployPeripherals.js 
```

The scripts to deploy in polygon EVM network are in **scripts/deploy-polygon/**

Yo need to run the scripts and fill the **scripts/deploy-polygon/Deployed.js** manually:

```
npx hardhat --network polygon  run  scripts/deploy-polygon/01deployVault.js 
npx hardhat --network polygon  run  scripts/deploy-polygon/02deployOrderBook.js 
npx hardhat --network polygon  run  scripts/deploy-polygon/03deployPosition.js 
npx hardhat --network polygon  run  scripts/deploy-polygon/04deployPeripherals.js 
```

##The scripts omited: 

The  scripts just deploy the funtional basics, they ommited
    - Timelock
    - Any Referals /referal reward mecanism
    - Any multisig


# GMX README 👇

# GMX Contracts
Contracts for GMX.

Docs at https://gmxio.gitbook.io/gmx/contracts.

## Install Dependencies
If npx is not installed yet:
`npm install -g npx`

Install packages:
`npm i`

## Compile Contracts
`npx hardhat compile`

## Run Tests
`npx hardhat test`


