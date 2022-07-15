export const minimizeAddressSmartContract = (str: String) => {
    if (!str) return;
    return str.substring(0, 8) + "..." + str.substring(str.length - 4, str.length);
}