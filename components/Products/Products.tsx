import { useState, useEffect, useMemo, useCallback } from "react"
import { getAllProducts } from "../api/getAllProducts"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Image from "next/image";
import SkeltonCardProduct from "./SkeltonCardProduct";
import InfiniteScroll from "react-infinite-scroll-component";




function Product() {
    const [allProducts, setAllProducts] = useState<any>([])
    const [products, setProducts] = useState<any>([])
    const [countScroll, setCountScroll] = useState<number>(8)
    const [hasMore, setHasMore] = useState<boolean>(true)
    let count: number = 4;
    const fetchData = useCallback(async (countScroll: number) => {
        console.log("fetch data")
        const data = await getAllProducts()
        console.log(data)
        setAllProducts(data.products)
        setCountScroll((prev) => prev += 1)
        setProducts((prev: any) => data.products.filter((item: any, i: number) => i <= countScroll))

        console.log(count)
    }, [])
    useEffect(() => {
        fetchData(countScroll)
    }, [])
    const scroll = () => {
        if (countScroll > allProducts.length || countScroll === allProducts.length) {
            setHasMore(false)
        } else {
            console.log('scroll')
            setCountScroll((prev) => prev += 1)
            setProducts((prev: any) => allProducts.filter((item: any, i: number) => i <= countScroll))
        }
    }
    return (
        <InfiniteScroll
            dataLength={products ? products.length : 0} //This is important field to render the next data
            next={scroll}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            // below props only if you need pull down functionality
            pullDownToRefreshThreshold={1}

            pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
        >
            <Grid container spacing={2}>
                {products.length > 1 ?
                    products.map((product: any, index: number) => {
                        return (
                            <>
                                {product ?
                                    <Grid key={index} item xs={4}>
                                        <Card style={{ backgroundColor: "#444444d9", borderRadius: '12px', border: '1px solid #ffededd9', color: 'white' }} sx={{ maxWidth: 345, maxHeight: 500 }}>
                                            <Image style={{ maxHeight: 310 }} src={product.images[0]} width={350} height={310} alt={product.title} placeholder="blur" blurDataURL={product.images[0]} />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
                                                </Typography>
                                                <Typography sx={{ maxHeight: 30 }} variant="body2" color="text.white">
                                                    {product.description.substring(0, 30)}...
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">Share</Button>
                                                <Button size="small">Learn More</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid> : null}
                            </>
                        )
                    })
                    :
                    <SkeltonCardProduct amount={20} />
                }
            </Grid>
        </InfiniteScroll>

    )
}


export default Product