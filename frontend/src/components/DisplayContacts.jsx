import ContactCard from './ContactCard';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import AddContact from './AddContact';
import { PERSON_API } from '../utils/constants';

const DisplayContacts = () => {
    // const url = 'https://randomuser.me/api/';
    const [data, setData] = useState(null);
    const [contactList, setContactList] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(PERSON_API);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log('current data', jsonData);
                setData(jsonData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [PERSON_API]);

    useEffect(() => {
        if (data) {
            if (!filterQuery) {
                // display the first 10 contacts if no filter is applied
                setContactList(data?.slice(0, 10));
            } else {
                console.log(`data?.results?`, data);
                const queryString = filterQuery.toLowerCase();
                const filteredData = data?.results?.filter((contact) => {
                    const fullName = `${contact.first_name} ${contact.last_name}`;

                    // if it's just one letter, return all names that start with it
                    if (queryString.length === 1) {
                        const firstLetter = fullName.charAt(0).toLowerCase();
                        return firstLetter === queryString;
                    } else {
                        return fullName.toLowerCase().includes(queryString);
                    }
                });
                setContactList(filteredData);
                console.log('contactList after filtering:', filteredData);
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
                </div>
            </div>

            <div className='bg-gray-100 p-5 rounded '>
                <section >      
                    {contactList?.length < 1 && <h1>No data matches your search</h1>}
                    {/* <ContactCard contactList={contactList} /> */}
                    {contactList?.length > 0 && <ContactCard contactList={contactList} />}
                </section>
            </div>
        </div>

    );
};

export default DisplayContacts;