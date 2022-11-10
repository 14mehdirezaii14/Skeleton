export const getAllProducts = async () => {
    const data = await fetch(`https://dummyjson.com/products?limit=200`, { cache: "force-cache" })
        .then(res => res.json())
    return data
}