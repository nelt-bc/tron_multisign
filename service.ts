import { TronWeb } from "tronweb";

export const createMultiSignWallet = async (
  ownerWallet: TronWeb,
  [ownerAddress, subAddress0, subAddress1]: string[]
) => {
  const updateTx =
    await ownerWallet.transactionBuilder.updateAccountPermissions(
      ownerAddress,
      {
        permission_name: "owner",
        threshold: 2,
        keys: [
          {
            address: ownerAddress,
            weight: 1,
          },
          { address: subAddress0, weight: 1 },
          { address: subAddress1, weight: 1 },
        ],
        type: 0
      }, undefined,
      [{
        permission_name: "active",
        threshold: 2,
        // use to set sub account operation
        operations: "7fff1fc003000000000000000000000000000000000000000000000000000000", 
        keys: [
          {
            address: ownerAddress,
            weight: 1,
          },
          { address: subAddress0, weight: 1 },
          { address: subAddress1, weight: 1 },
        ],
        type: 2
      }]
    );

  const signedTx = await ownerWallet.trx.sign(updateTx);
  const res = await ownerWallet.trx.sendRawTransaction(signedTx);
  console.log(res);
};
