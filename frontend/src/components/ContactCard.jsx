import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Tooltip from '@mui/material/Tooltip';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Details from './details_view/Details';
import { PERSON_API } from '../utils/constants';

const ContactCard = ({ contactList, showDeleteAlert, refetchContacts }) => {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null); // State to hold the contact to display in the modal

    const handleDelete = async (contactId, first_name, last_name) => {
        const fullName = `${first_name} ${last_name}`;

        const deleteConfirm = window.confirm(`Are you sure you want to delete ${fullName}?`);
        if (deleteConfirm) {
            try {
                const response = await fetch(`${PERSON_API}${contactId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                showDeleteAlert(fullName); // Trigger alert in parent
                // Refetch contacts after successful deletion
                await refetchContacts();
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        }
    };

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setSelectedContact(null); // Clear the selected contact when the modal is closed
    };

    const handleOpenDetailsModal = (contact) => {
        console.log("Selected contact:", contact); // Log the selected contact
        setSelectedContact(contact); // Set the selected contact when the button is clicked
        setOpenDetailsModal(true);
    };

    return (

        <div className="flex flex-col">
            {contactList?.map((contact, index) => (
                <figure
                    className="rounded-lg shadow-md m-5 pb-3 inline-flex justify-center"
                    key={index}  // Adjust width as needed
                >
                    {contact.image_blob ? (
                        <img
                            src={contact.image_blob}
                            alt={`${contact.first_name} ${contact.last_name}`}
                            className="w-24 h-24 object-cover rounded-full mr-4" />
                    ) : (
                        <div className="w-24 h-24 rounded-full mr-4 bg-blue-100 text-white flex items-center justify-center text-3xl font-semibold">
                            {contact.first_name.charAt(0).toUpperCase()}{contact.last_name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <figcaption>
                        <p className="text-gray-700 font-semibold text-xl mb-2">
                            {contact.first_name} {contact.last_name}
                        </p>
                        <table className="table-auto">
                            <tbody>
                                <tr>
                                    <td><span className="font-medium">email: </span></td>
                                    <td>{contact.email}</td>
                                </tr>
                                <tr>
                                    <td><span className="font-medium">phone: </span></td>
                                    <td>{contact.phone}</td>
                                </tr>
                                <tr>
                                    <td><span className="font-medium">company: </span></td>
                                    <td>{contact.company}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-2">
                            <Tooltip title="View Details" arrow>
                                <Button onClick={() => handleOpenDetailsModal(contact)}><VisibilityOutlinedIcon /></Button>
                            </Tooltip>

                            <Tooltip title="Delete contact" arrow>
                                <Button onClick={() => handleDelete(contact.id, contact.first_name, contact.last_name)}><DeleteOutlineIcon /></Button>
                            </Tooltip>
                        </div>
                    </figcaption>
                </figure>
            ))
            }
            <Modal open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Details contact={selectedContact}></Details>
            </Modal>
        </div >
    );
};

export default ContactCard;