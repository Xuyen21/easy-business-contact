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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState('');
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
            setContactList(jsonData);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [PERSON_API]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data available</p>;

    const showDeleteAlert = (personFullName) => {
        setDeleteMessage(`You deleted ${personFullName}.`);
        setShowAlertModal(true);
        setTimeout(() => {
            setShowAlertModal(false);
        }, 3000);
    };

    const closeAlert = () => {
        setShowAlertModal(false);
    };

    return (

        <RefreshContext.Provider value={{ fetchData }}>
            <div className='flex flex-row gap-2 justify-center items-center mb-5'>
                <div className=''>
                    <SearchBar setContactList={setContactList} setIsLoading={setIsLoading} setError={setError} setSearchValue={setSearchValue} searchValue={searchValue} />
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

                    {contactList?.length > 0 && <ContactCard contactList={contactList} showDeleteAlert={showDeleteAlert} refetchContacts={fetchData} />}
                </section>
            </div>
        </RefreshContext.Provider>

    );
};

export default DisplayContacts;