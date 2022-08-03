import { getAddress } from "ethers/lib/utils";

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
      42 - chars
    )}`;
  } catch (error) {
    // console.error(`Invalid 'address' parameter '${address}'.`);
    return "";
  }
}
