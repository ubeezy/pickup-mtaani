import React, { useMemo, useEffect } from 'react';
import { Box,Grid} from '@mui/material';
import { useRouter } from "next/router";
import ItemCard from "../../components/itemCard"

import CardTitle from "../../components/addAction";

export default function Inventory() {
    return (
        <Box sx={{ p: 2 }}>
            <CardTitle title="Item" />
            <Grid container justifyContent="center"  mt={1} spacing={3}>
                {[0, 1, 2,3,4,5,6,7,8,9,10,11,12].map((value) => (
                    <Grid key={value} item>
                        <ItemCard />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}