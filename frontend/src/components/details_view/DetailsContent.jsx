import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import AddIcCallTwoToneIcon from '@material-ui/icons/AddIcCallTwoTone';
import AlternateEmailTwoToneIcon from '@material-ui/icons/AlternateEmailTwoTone';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import CakeTwoToneIcon from '@material-ui/icons/CakeTwoTone';
import { RefreshContext } from '../../utils/contexts.js';
import { PERSON_API } from '../../utils/constants';


export default function DetailsContent({ contact }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const { fetchData } = useContext(RefreshContext);

    const handleEditClick = (field) => {
        setEditingField(field);
        setEditValue(contact[field] === null ? '' : contact[field]);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingField(null);
        setEditValue('');
    };

    const handleSaveEdit = async () => {
        if (!editingField) return;

        const updateData = { [editingField]: editValue };

        try {
            const response = await fetch(PERSON_API + `${contact.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to update ${editingField}`);
            }

            const updatedContact = await response.json();
            fetchData(); // Refetch contacts after successful update

            setIsEditing(false);
            setEditingField(null);
            setEditValue('');

        } catch (error) {
            console.error('Update error:', error);
            alert(`Failed to update ${editingField.replace(/_/g, ' ')}: ${error.message}`);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col h-full w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit {editingField.replace(/_/g, ' ')}</h3>
                <div>
                    <label htmlFor={`edit-${editingField}`} className="block text-gray-700 text-sm font-bold mb-2">
                        {editingField.replace(/_/g, ' ')}:
                    </label>
                    <input
                        type="text"
                        id={`edit-${editingField}`}
                        className="border border-gray-300 rounded-lg p-2 w-[70%]"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <Button onClick={handleSaveEdit} variant="contained" color="primary" size="small">
                        Save
                    </Button>
                    <Button onClick={handleCancelEdit} style={{ marginLeft: '8px' }} variant="outlined" size="small">
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }

    const contactDeconstructed = {};
    for (const key in contact) {
        if (Object.hasOwnProperty.call(contact, key)) {
            contactDeconstructed[key] = (contact[key] === null || contact[key] === '') ? 'not provided' : contact[key];
        }
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 grid grid-cols-3 gap-4 h-full w-full">

            <div className="relative">
                {contact.image_blob ? (
                    <img
                        src={contact.image_blob}
                        alt={`${contact.first_name} ${contact.last_name}`}
                        className="w-64 h-64 object-cover"
                    />
                ) : (
                    <div className="w-64 h-64 bg-blue-100 text-white flex items-center justify-center text-6xl font-semibold">
                        {contact.first_name.charAt(0).toUpperCase()}{contact.last_name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="absolute bottom-0 right-35 h-16 w-16">
                    <Tooltip title="Edit Image" arrow>
                        <Button onClick={() => handleEditClick('image_blob')} style={{ minWidth: 'auto'}}>
                            <EditIcon fontSize="small" />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="col-span-2 flex-col">
                <p>
                    First name: <span className="text-gray-500 text-sm mb-3">{contact.first_name}</span>
                    <Tooltip title="Edit Company" arrow>
                        <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('first_name')}>
                            <EditIcon fontSize='small' />
                        </Button>
                    </Tooltip>
                </p>
                <p>
                    Last name: <span className="text-gray-500 text-sm mb-3">{contactDeconstructed.last_name}</span>
                    <Tooltip title="Edit Company" arrow>
                        <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('last_name')}>
                            <EditIcon fontSize='small' />
                        </Button>
                    </Tooltip>
                </p>

                <p>
                    Company: <span className="text-gray-500 text-sm mb-3">{contactDeconstructed.company}</span>
                    <Tooltip title="Edit Company" arrow>
                        <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('company')}>
                            <EditIcon fontSize='small' />
                        </Button>
                    </Tooltip>
                </p>

                <p>
                    Role: <span className="text-gray-500 text-sm mb-3">{contactDeconstructed.role}</span>
                    <Tooltip title="Edit Role" arrow>
                        <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('role')}>
                            <EditIcon fontSize='small' />
                        </Button>
                    </Tooltip>
                </p>

                <div className="grid grid-cols-1 gap-3 flex-grow overflow-y-auto"> {/* Added flex-grow and overflow-y-auto */}
                    <div className="flex items-center">
                        <MailOutlineTwoToneIcon />
                        <a href={`mailto:${contact.email}`} className="text-gray-700 hover:text-blue-500 ml-2">{contact.email}</a>
                        <Tooltip title="Edit Email" arrow>
                            <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('email')}>
                                <EditIcon fontSize='small' />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="flex items-center">
                        <AddIcCallTwoToneIcon />
                        <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-blue-500 ml-2">{contact.phone}</a>
                        <Tooltip title="Edit Phone" arrow>
                            <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('phone')}>
                                <EditIcon fontSize='small' />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="flex items-center">
                        <AlternateEmailTwoToneIcon />
                        {contact.linkedin ? (
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 hover:underline">linkedin</a>
                        ) : (
                            <p className='ml-2'>LinkedIn: <span className="text-gray-600 text-sm mb-3">{contactDeconstructed.linkedin}</span> </p>
                        )}
                        <Tooltip title="Edit LinkedIn" arrow>
                            <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('linkedin')}>
                                <EditIcon fontSize='small' />
                            </Button>
                        </Tooltip>
                    </div>                                  
                </div>
            </div>
        </div>
    );
}