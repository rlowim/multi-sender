# Multi-Address Send

This smart contract allows users to easily send Ethers to multiple Ethereum addresses.

> **Note**: I create this project for learning purposes.

## Installation and launch on a local machine

#### Tools:

- Git/Github
- Node.js
- React
- Hardhat
- VSCode/terminal

### Install or upgrade Git

You can check [this](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Install or upgrade Node.js

Currently maintained LTS version is recommended.
[Here](https://nodejs.org/en/download/package-manager) you have the instruction.

### Clone the repository from Github and move to the project directory

```shell
git clone https://github.com/rlowim/multi-sender.git
cd multi-send
```

### Install project dependencies

```shell
npm install
```

### Run Hardhat's testing network

```shell
npm hardhat node
```

### Run automated tests

```shell
npx hardhat test
```

### Deploy your contract on Hardhat's testing network

You need to do this on new terminal. Go to the root directory of the project and then run deployment script using the instruction below.

```shell
npx hardhat run scripts/deploy.js --network localhost
```

### Run the frontend

```shell
cd frontend
npm install
npm start
```

To use the DApp you need to go to http://localhost:3000/ in your browser and configure your web3 wallet to connect to localhost 8545. [Here](https://medium.com/@kaishinaw/connecting-metamask-with-a-local-hardhat-network-7d8cea604dc6) you can find detailed instructions.

## License

This project is licensed under the terms of the MIT License (see the file LICENSE).
