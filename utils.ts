import { TronWeb } from "tronweb"

export const b58ToHexAddress = (address: string) => {
  return TronWeb.address.toHex(address)
}

export const newTronWeb = (privateKey: string) => {
  return new TronWeb({
    fullHost: "https://nile.trongrid.io/",
    privateKey,
  });
};