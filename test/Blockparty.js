const { expect } = require("chai");

describe("Blockparty", function () {
    let blockparty
    let deployer, user1, user2, users
    beforeEach(async () => {
        // Get signers from development accounts 
        [deployer, user1, user2, ...users] = await ethers.getSigners();
        // We get the contract factory to deploy the contract
        const BlockpartyFactory = await ethers.getContractFactory("Blockparty");
        // Deploy contract
        blockparty = await BlockpartyFactory.deploy();
    })
    describe('Hosts', async () => {
        it("Should set host properties", async function () {
            await expect(blockparty.connect(user1).becomeHost("user1", 10))
                .to.emit(blockparty, "HostCreated")
                .withArgs(
                    "user1",
                    10,
                    0
                );
        });
    })
    describe('Joining Party', async () => {
        it("Should join party", async function () {
            blockparty.connect(user1).becomeHost("user1", 10);
            blockparty.connect(user2).joinParty("user1", 20);
        });
    })
});
