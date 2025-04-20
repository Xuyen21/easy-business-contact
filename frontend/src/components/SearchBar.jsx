import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import debounce from 'lodash.debounce';
import * as React from 'react';
import { PERSON_API } from '../utils/constants';

export default function SearchBar({ setContactList, setIsLoading, setError, searchValue, setSearchValue }) {
    const inputRef = React.useRef(null); // Ref for the input field
    const searchHandler = React.useCallback(async (value) => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({ person_search: value });
            const response = await fetch(PERSON_API + `?${params}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setContactList(jsonData);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [setContactList, setIsLoading, setError]);

    const debouncedSearchHandler = React.useMemo(
        () =>
            debounce((value) => {
                searchHandler(value);
            }, 1000),
        [searchHandler]
    );

    // Cleanup debounce handler on unmount
    React.useEffect(() => {
        return () => {
            debouncedSearchHandler.cancel();
        };
    }, [debouncedSearchHandler]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        debouncedSearchHandler(value); // Call the debounced search handler
    };
    // Ensure the input field is focused
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

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
                    value={searchValue}
                    onChange={handleInputChange}
                    inputRef={inputRef}
                />
            </FormControl>
        </div>

    );
}