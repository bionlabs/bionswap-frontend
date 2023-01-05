import { getAddress } from 'ethers/lib/utils';

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
  } catch (error) {
    // console.error(`Invalid 'address' parameter '${address}'.`);
    return '';
  }
}
export function nFormatter(num: number|string) {
  if(typeof num == 'string'){
    const newNumber = Number(num);
    if (newNumber >= 10e12) {
      return (newNumber / 10e12).toFixed(2).replace(/\.0$/, '') + 'T';
    }
    if (newNumber >= 10e9) {
      return (newNumber / 10e9).toFixed(2).replace(/\.0$/, '') + 'B';
    }
    if (newNumber >= 10e6) {
      return (newNumber / 10e6).toFixed(2).replace(/\.0$/, '') + 'M';
    }
    if (newNumber >= 10e3) {
      return (newNumber / 10e3).toFixed(2).replace(/\.0$/, '') + 'K';
    }
    else return newNumber;
  }
  else {
    if (num >= 10e12) {
      return (num / 10e12).toFixed(2).replace(/\.0$/, '') + 'T';
    }
    if (num >= 10e9) {
      return (num / 10e9).toFixed(2).replace(/\.0$/, '') + 'B';
    }
    if (num >= 10e6) {
      return (num / 10e6).toFixed(2).replace(/\.0$/, '') + 'M';
    }
    if (num >= 10e3) {
      return (num / 10e3).toFixed(2).replace(/\.0$/, '') + 'K';
    }
    else return num;
  }
}
