export const getAllProducts = async () => {
    const data = await fetch('https://dummyjson.com/products', { cache: "force-cache" })
        .then(res => res.json())
    return data
}