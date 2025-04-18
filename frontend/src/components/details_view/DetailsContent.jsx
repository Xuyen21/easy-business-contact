import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import AddIcCallTwoToneIcon from '@material-ui/icons/AddIcCallTwoTone';
import AlternateEmailTwoToneIcon from '@material-ui/icons/AlternateEmailTwoTone';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import CakeTwoToneIcon from '@material-ui/icons/CakeTwoTone';
import { RefreshContext } from '../../utils/contexts.js';
import EditImage from '../EditImage';
import { PERSON_API } from '../../utils/constants';


export default function DetailsContent({ contact }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const { fetchData } = useContext(RefreshContext);

    // State for image editing
    const [isEditingImage, setIsEditingImage] = useState(false); // New state for image editing
    const [imagePreview, setImagePreview] = useState(contact?.image_blob || null); // Preview URL
    const [newImageFile, setNewImageFile] = useState(null); // To store the selected file

    // const handleEditClick = (field) => {
    //     console.log('Edit field:', field);
    //     if (field === 'image_blob') {
    //         setIsEditingImage(true);
    //     } else {
    //         setEditingField(field);
    //         setEditValue(contact[field] === null ? '' : contact[field]);
    //         setIsEditing(true);
    //     }
    // };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setNewImageFile(file); // Store the selected file
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImagePreview(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    // const handleCancelImageEdit = () => {
    //     setIsEditingImage(false);
    //     setImagePreview(contact?.image_blob || null); // Reset to the original image
    //     setNewImageFile(null);
    // };
    const handleEditClick = (field) => {
        console.log('Edit field:', field);
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
            console.log('contact.id:', contact.id); // Log the contact ID
            console.log('updateData:', updateData); // Log the update data
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
                    <div className="flex items-center">
                        <CakeTwoToneIcon />
                        <p className='ml-2'>Born: <span className="text-gray-600 text-sm mb-3">{contactDeconstructed.date_of_birth}</span></p>
                        <Tooltip title="Edit Date of Birth" arrow>
                            <Button style={{ marginLeft: '6px' }} onClick={() => handleEditClick('date_of_birth')}>
                                <EditIcon fontSize='small' />
                            </Button>
                        </Tooltip>
                    </div>

                    {(contact.city || contact.state || contact.country) && (
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0L6.343 16.657a9 9 0 1011.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <p className="text-gray-700">
                                Location: {contact.city}{contact.state && `, ${contact.state}`}{contact.country && `, ${contact.country}`}
                            </p>
                            <Tooltip title="Edit Location (Requires Backend Logic)" arrow>
                                <Button style={{ marginLeft: '6px' }} disabled> {/* Consider how to handle multi-field updates */}
                                    <EditIcon fontSize='small' />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                    {contact.streetAddress && contact.zipPostalCode && (
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7M19 9v10a1 1 0 01-1 1h-3m-4-12H3m2 5h14M5 12h2m10-5h2M6 19h6m-6-1h4"></path></svg>
                            <p className="text-gray-700">
                                Address: {contact.streetAddress}, {contact.zipPostalCode}
                            </p>
                            <Tooltip title="Edit Address (Requires Backend Logic)" arrow>
                                <Button style={{ marginLeft: '6px' }} disabled> {/* Consider how to handle multi-field updates */}
                                    <EditIcon fontSize='small' />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}