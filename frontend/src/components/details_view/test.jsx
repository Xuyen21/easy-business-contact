import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ReceiptTwoToneIcon from '@material-ui/icons/ReceiptTwoTone';
import { useState, useEffect } from 'react';
import EditImage from './EditImage'; // Import the EditImage component
import { getBase64 } from '../utils/Base64'; // Assuming you have this utility

function deconstructContact(contact) {
    if (!contact) return {};

    const deconstructed = {};
    for (const key in contact) {
        if (Object.hasOwnProperty.call(contact, key)) {
            deconstructed[key] = (contact[key] === null || contact[key] === '') ? 'not provided' : contact[key];
        }
    }
    return deconstructed;
}

export default function DetailsContent({ contact: initialContact, onContactUpdate }) { // Expect a function to update the contact
    const [contact, setContact] = useState({});

    useEffect(() => {
        setContact(deconstructContact(initialContact));
    }, [initialContact]);

    const handleImageUpload = async (file) => {
        if (file) {
            try {
                const base64Image = await getBase64(file);
                // Update the local contact state
                setContact(prevContact => ({
                    ...prevContact,
                    image_blob: base64Image,
                }));
                // If you need to immediately update the parent's contact data:
                if (onContactUpdate) {
                    onContactUpdate({ ...contact, image_blob: base64Image });
                }
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    if (!contact || Object.keys(contact).length === 0) {
        return <div className="bg-gray-100 rounded-md shadow-md p-6 text-center text-gray-500 h-full w-full flex items-center justify-center">No contact details available.</div>;
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col h-full w-full">
            <div className="relative flex items-center justify-center mb-4">
                {contact.image_blob ? (
                    <img
                        src={contact.image_blob}
                        alt={`${contact.first_name} ${contact.last_name}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold">
                        {contact.first_name?.charAt(0)?.toUpperCase()}
                        {contact.last_name?.charAt(0)?.toUpperCase()}
                    </div>
                )}
                <EditImage onImageUpload={handleImageUpload} /> {/* Pass the function as prop */}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {contact.first_name} {contact.last_name}
            </h2>

            <div className="grid grid-cols-1 gap-3 flex-grow overflow-y-auto">
                {Object.entries(contact).map(([key, value]) => {
                    if (key === 'image_blob' || key === 'first_name' || key === 'last_name') {
                        return null;
                    }
                    return (
                        <div key={key} className="flex items-center">
                            <span className="font-semibold text-gray-700 capitalize mr-2">{key.replace(/_/g, ' ')}:</span>
                            <span className="text-gray-700">{String(value)}</span>
                            <Tooltip title="Edit" arrow>
                                <Button style={{ marginLeft: '6px' }}>
                                    <ReceiptTwoToneIcon fontSize='small' />
                                </Button>
                            </Tooltip>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}