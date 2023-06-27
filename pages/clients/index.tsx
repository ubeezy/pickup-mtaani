import React, { useMemo, useEffect } from 'react';
import { Box, List } from '@mui/material';
import { useRouter } from "next/router";
import ClientList from "../../components/customerList"
import CardTitle from "../../components/addAction";

export default function Clients() {
    return (
        <Box sx={{ p: 2 }}>
            <CardTitle title="Client" />
            <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: "0.7rem" }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                    <div key={value} >
                        <ClientList />
                    </div>
                ))}
            </List>
        </Box>
    );
}