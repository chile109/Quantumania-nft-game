const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["AntMan", "Wasp", "Kang"],       // Names
        ["https://upload.wikimedia.org/wikipedia/commons/7/76/Ant_man%28Scott_Lang%29.jpg", // Images
            "https://media.wired.com/photos/5b36b0e59429444844cd0918/master/pass/final.jpg",
            "https://cdn.vox-cdn.com/thumbor/JJNqcMiHGbBBJAsptN_Wdw8AbgA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24136515/kang_quantumania.jpg"],
        [250, 200, 300],                    // HP values
        [25, 50, 100]                       // Attack damage values
    );

    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();