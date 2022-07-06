const formatAccount = (address:string) => {
    const result = address.slice(0,5) + '...' + address.slice(-4)
    return result
}

export default formatAccount