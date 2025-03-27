import ContactCard from './ContactCard';
import { useEffect, useState } from 'react';

const TestComponent = () => {
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

    return (
        <div className={'bg-gray-100'}>
            <section>
                <form>
                    <input
                        type={'text'}
                        placeholder={'type here to filter...'}
                        onChange={(event) => setFilterQuery(event.target.value)}
                        className={'ml-20 mt-6 rounded-md p-2'}
                    />
                </form>
            </section>
            <section className={'grid sm:grid-cols-2 md:grid-cols-4 gap-6 p-20'}>
                {contactList?.length < 1 && <h1>No data matches your search</h1>}
                <ContactCard contactList={contactList} />
            </section>
        </div>
    );
};

export default TestComponent;