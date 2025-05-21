import * as dotenv from "dotenv";
import { newTronWeb } from "./utils";

dotenv.config();

const main = async () => {
  const owner = newTronWeb(process.env.PRIVATE_KEY!);
  const wallet1 = newTronWeb(process.env.SUB0_PRIVATE_KEY!);
  const wallet2 = newTronWeb(process.env.SUB1_PRIVATE_KEY!);

  // await createMultiSignWallet(owner, [
  //   owner.defaultAddress.base58 as string,
  //   wallet1.defaultAddress.base58 as string,
  //   wallet2.defaultAddress.base58 as string,
  // ]);

  const sendTx = await owner.transactionBuilder.sendTrx(
    "TJPncMxDwoApkXjVU4oU6T28W5aUbWnGRG",
    10
  )

  const signedTx = await owner.trx.sign(sendTx)
  let multiSignedTx = await wallet1.trx.multiSign(signedTx)
  multiSignedTx = await wallet2.trx.multiSign(multiSignedTx)

  const res = await owner.trx.sendRawTransaction(multiSignedTx)
  console.log(res)
};

main();
