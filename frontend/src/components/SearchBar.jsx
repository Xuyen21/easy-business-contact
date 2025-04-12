import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function SearchBar({ setFilterQuery }) {
    return (
        <div className='h-10'>
            <FormControl variant="outlined">
                <OutlinedInput
                    size="small"
                    id="search"
                    placeholder="Search contact…"
                    sx={{ flexGrow: 1 }}
                    startAdornment={
                        <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                            <SearchRoundedIcon fontSize="small" />
                        </InputAdornment>
                    }
                    inputProps={{
                        'aria-label': 'search',
                    }}
                    onChange={(event) => setFilterQuery(event.target.value)}
                />
            </FormControl>
        </div>

    );
}