import { useState, useEffect } from "react"
import { getAllProducts } from "../api/getAllProducts"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Image from "next/image";
import SkeltonCardProduct from "./SkeltonCardProduct";





function Product() {
    const [products, setProducts] = useState<any>()
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllProducts()
            // setTimeout(() => {
                setProducts(data.products)
            // }, 1000)
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log(products)
    }, [products])
    return (

        <Grid container spacing={2}>
            {products ?
                products.map((product: any, index: number) => {
                    return (
                        // <p >
                        //     
                        //     <br />
                        // </p>
                        <Grid key={index} item xs={3}>
                            <Card style={{ backgroundColor: "#444444d9", borderRadius: '12px', border: '1px solid #ffededd9', color: 'white' }} sx={{ maxWidth: 345, maxHeight: 500 }}>
                                {/* <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.images[0]}
                                    alt="green iguana"
                                /> */}
                                <Image style={{ maxHeight: 310 }} src={product.images[0]} width={310} height={310} alt={product.title} placeholder="blur" blurDataURL={product.images[0]} />
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
                        </Grid>


                    )
                })
                :
                // <p>
                <SkeltonCardProduct amount={20} />
            }
        </Grid>
    )
}


export default Product