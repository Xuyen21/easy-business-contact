import { useState, useEffect, use } from 'react';
import Button from '@mui/material/Button';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { PERSON_API } from '../utils/constants';

const ContactCard = ({ contactList, showDeleteAlert, refetchContacts }) => {

    const handleDelete = async (contactId, first_name, last_name) => {
        const fullName = `${first_name} ${last_name}`;

        const deleteConfirm = window.confirm(`Are you sure you want to delete ${fullName}?`);
        if (deleteConfirm) {
            try {
                const response = await fetch(`${PERSON_API}/${contactId}`, {
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
                // Handle error (e.g., show an error message to the user)
            }
        }
    };


    return (

        <div className="flex flex-col">
            {contactList?.map((contact, index) => (
                <figure
                    className="rounded-lg shadow-md m-5 pb-3 inline-flex justify-center"
                    key={index}  // Adjust width as needed
                >
                    <img
                        alt="avatar"
                        className="w-22 h-22 object-cover rounded-full mr-4" // Add margin right
                        // src={`data:image/jpeg;base64,${contact.image_blob}`}
                        src={contact.image_blob}
                    />
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
                            <Button><VisibilityOutlinedIcon /></Button>
                            <Button><EditIcon /></Button>
                            <Button onClick={() => handleDelete(contact.id, contact.first_name, contact.last_name)}><DeleteOutlineIcon /></Button>

                        </div>
                    </figcaption>
                </figure>
            ))
            }
        </div >
    );
};

export default ContactCard;