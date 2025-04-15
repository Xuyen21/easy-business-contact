import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddressDropDown from './AddressDropdown';
import { getBase64 } from '../utils/Base64.js';
import { useState, useContext } from 'react';
import StatusContext from '../utils/UploadStatusContext.js';
import { PERSON_API } from '../utils/constants.js';

export default function AddContact() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { updateUploadState } = useContext(StatusContext);

    const [imagePreview, setImagePreview] = useState(null); // Local preview URL
    const [imageFile, setImageFile] = useState(null); // Store the actual file


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: null,
        linkedin: "",
        phone: "",
        role: "",
        company: "",
        title: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,

        };
        console.log("Sending data:", payload);
        // send data to backend
        const response = await fetch(PERSON_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),

        })
        const data = await response.json();
        if (response.ok) {
            console.log('Success:', data);
            // Set status to true on success
            updateUploadState(true);
        }
        else {
            alert('Error:', data);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            getBase64(file).then((base64) => {

                setFormData({
                    ...formData,
                    image_blob: base64
                });
            });
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    }

    return (
        <div>
            <div className='h-10'>
                <Button variant="outlined" onClick={handleOpen}
                    sx={{ color: 'gray', borderColor: '#d1d5db', height: '100%', minWidth: '40px', padding: 0, '&:hover': { backgroundColor: 'gray', color: 'white' } }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded p-4 my-10 overflow-y-scroll max-w-[80vw] h-[80vh] sm:w-[50vw] sm:h-[80vh]'>
                    <h2 id="modal-modal-title" className="text-lg font-semibold">
                        Add a new contact
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="border-b border-gray-900/10 pb-6">
                                <div className='flex justify-start my-5 gap-10'>
                                    <div className="col-span-3">
                                        <label htmlFor="first_name" className="block text-sm/6">First name<span className='text-red-500'> *</span></label>
                                        <div className="mt-2">
                                            <input type="text" name="first_name" id="first_name" onChange={handleChange} required autoComplete="given-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div className="col-span-3">
                                        <label htmlFor="last_name" className="block text-sm/6">Last name<span className='text-red-500'> *</span></label>
                                        <div className="mt-2">
                                            <input type="text" name="last_name" id="last_name" onChange={handleChange} autoComplete="family-name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="date_of_birth" className="block text-sm/6">Date of birth</label>
                                        <div className="mt-2">
                                            <input id="date_of_birth" name="date_of_birth" type="date_of_birth" onChange={handleChange} autoComplete="date_of_birth" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-start my-5 gap-10'>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm/6">Email address<span className='text-red-500'> *</span></label>
                                        <div className="mt-2">
                                            <input id="email" name="email" type="email" onChange={handleChange} autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="phone" className="block text-sm/6">Phone<span className='text-red-500'> *</span></label>
                                        <div className="mt-2">
                                            <input id="phone" name="phone" type="phone" onChange={handleChange} autoComplete="phone" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="linkedin" className="block text-sm/6">LinkedIn</label>
                                        <div className="mt-2">
                                            <input id="linkedin" name="linkedin" type="linkedin" onChange={handleChange} autoComplete="linkedin" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-start my-5 gap-10'>
                                    {/* company inout field */}
                                    <div className="sm:col-span-4">
                                        <label htmlFor="company" className="block text-sm/6">Company</label>
                                        <div className="mt-2">
                                            <input id="company" name="company" type="company" onChange={handleChange} autoComplete="company" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="title" className="block text-sm/6">Title</label>
                                        <div className="mt-2">
                                            <input id="title" name="title" type="title" onChange={handleChange} autoComplete="title" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                </div>

                                <AddressDropDown />
                                <div className='flex justify-start my-5 gap-10'>
                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm/6 ">Street address</label>
                                        <div className="mt-2">
                                            <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm/6">ZIP / Postal code</label>
                                        <div className="mt-2">
                                            <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                        </div>
                                    </div>
                                </div>
                                <div className="block text-sm/6">Upload image</div>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 ">

                                    <div>
                                        <label htmlFor="image_blob" className="relative cursor-pointer rounded-md bg-white text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-800">
                                            {!imagePreview && <span>Select cover photo</span>}
                                        </label>
                                        <input id="image_blob" name="image_blob" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Uploaded Image"
                                                className="mt-2 max-w-full max-h-48 object-contain" // Added classes here
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm/6 font-semibold text-gray-900 hover:text-red-600">Cancel</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </form>

                </div>
            </Modal>
        </div>
    );


}
