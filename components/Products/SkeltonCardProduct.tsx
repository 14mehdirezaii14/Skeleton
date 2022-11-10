import Skeleton from "react-loading-skeleton"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
const SkeltonCardProduct: any = ({ amount }: { amount: number }) => {
    const loadCards = Array(amount).fill(1);
    return loadCards.map((_, i) => (
        <Grid key={i} item xs={4}>
            <Card style={{ backgroundColor: "#444444d9", borderRadius: '12px', border: '1px solid #ffededd9', color: 'white' }} sx={{ maxWidth: 345, maxHeight: 500 }}>
                <Skeleton width={350} height={310} baseColor="gray" />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Skeleton width={250} height={10} baseColor="gray" />
                    </Typography>
                    <Typography sx={{ maxHeight: 30 }} variant="body2" color="text.white">
                        <Skeleton width={250} height={10} baseColor="gray" />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
    ));
};

export default SkeltonCardProduct