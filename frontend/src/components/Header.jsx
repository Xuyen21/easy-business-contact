import * as React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DisplayDate from './DisplayDate';


import SearchBar from './SearchBar';

export default function Header() {
    return (
        <Stack direction="row" sx={{ gap: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SearchBar />
            <DisplayDate />
            <NotificationsRoundedIcon />
        </Stack>
    );
}