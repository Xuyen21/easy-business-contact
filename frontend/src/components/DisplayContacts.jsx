import ContactCard from './ContactCard';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import AddContact from './AddContact';
import { PERSON_API } from '../utils/constants';

import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { RefreshContext } from '../utils/contexts.js';

const DisplayContacts = () => {

    const [data, setData] = useState(null);
    const [contactList, setContactList] = useState(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAlertModal, setShowAlertModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(PERSON_API);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
            setContactList(jsonData); // Update contactList here
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [PERSON_API]);


    useEffect(() => {
        if (data) {
            if (!filterQuery) {
                // display the first 10 contacts if no filter is applied data?.slice(0, 10)
                setContactList(data);
            } else {
                const queryString = filterQuery.toLowerCase();
                const filteredData = data?.filter((contact) => {
                    const fullName = `${contact.first_name} ${contact.last_name}`;
                    return fullName.toLowerCase().includes(queryString);
                });
                setContactList(filteredData);
                console.log('contactList after filtering:', filteredData);
            }
        }
    }, [data, filterQuery]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (!data) return <p>No data available</p>;
    const showDeleteAlert = (personFullName) => {
        setDeleteMessage(`You deleted ${personFullName}.`);
        // setOpenModal(true);
        setShowAlertModal(true);
        setTimeout(() => {
            setShowAlertModal(false);
        }, 5000); // 5 seconds
    };

    const closeAlert = () => {
        setShowAlertModal(false);
        // setOpenModal(false);
    };

    return (

        <RefreshContext.Provider value={{ fetchData }}>
            <div className='flex flex-row gap-2 justify-center items-center mb-5'>
                <div className=''>
                    <SearchBar setFilterQuery={setFilterQuery} />
                </div>
                <div className='h-10'>
                    <AddContact refetchContacts={fetchData} />
                </div>
            </div>

            <div className='bg-gray-100 p-5 rounded '>
                {showAlertModal && (
                    <Modal open={open}
                        onClose={closeAlert}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={closeAlert}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            {deleteMessage}
                        </Alert>
                    </Modal>

                )}
                <section >
                    {contactList?.length < 1 && <h1>No data matches your search</h1>}
                    {/* <ContactCard contactList={contactList} /> */}
                    {contactList?.length > 0 && <ContactCard contactList={contactList} showDeleteAlert={showDeleteAlert} refetchContacts={fetchData} />}
                </section>
            </div>
        </RefreshContext.Provider>

    );
};

export default DisplayContacts;