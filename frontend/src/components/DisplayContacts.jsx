import ContactCard from './ContactCard';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import Button from '@mui/material/Button';
import AddContact from './AddContact';

const DisplayContacts = () => {
    const url = 'https://randomuser.me/api/';
    const [data, setData] = useState(null);
    const [contactList, setContactList] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url + '?results=200');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    useEffect(() => {
        if (data) {
            if (!filterQuery) {
                setContactList(data?.results?.slice(0, 10));
            } else {
                const queryString = filterQuery.toLowerCase();
                const filteredData = data?.results?.filter((contact) => {
                    const fullName = `${contact.name.first} ${contact.name.last}`;

                    // if it's just one letter, return all names that start with it
                    if (queryString.length === 1) {
                        const firstLetter = fullName.charAt(0).toLowerCase();
                        return firstLetter === queryString;
                    } else {
                        return fullName.toLowerCase().includes(queryString);
                    }
                });
                setContactList(filteredData);
            }
        }
    }, [data, filterQuery]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const onClick = () => {

    }

    return (
        <div>
            <div className='flex flex-row gap-2 justify-center items-center mb-5'>
                <div className=''>
                    <SearchBar setFilterQuery={setFilterQuery} />
                </div>

                <div className='h-10'>
                    <AddContact />
                    {/* <Button variant="outlined" onClick={onClick}
                        sx={{ color: 'gray', borderColor: '#d1d5db', height: '100%', minWidth: '40px', padding: 0, '&:hover': { backgroundColor: 'gray', color: 'white' } }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    </Button> */}
                </div>
            </div>
            <div className='bg-gray-100 p-5 rounded '>
                <section >
                    {contactList?.length < 1 && <h1>No data matches your search</h1>}
                    <ContactCard contactList={contactList} />
                </section>
            </div>
        </div>

    );
};

export default DisplayContacts;