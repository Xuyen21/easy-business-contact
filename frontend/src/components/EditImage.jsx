import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

function EditImage({ onImageUpload }) {
    const fileInputRef = useRef(null);

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && onImageUpload) {
            onImageUpload(file);
        }
        // Optionally clear the input after upload
        event.target.value = null;
    };

    return (
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
            <Tooltip title="Upload New Image" arrow>
                <Button
                    onClick={handleUploadButtonClick}
                    size="small"
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-full shadow-md"
                    style={{ minWidth: '24px', height: '24px', padding: '0' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </Button>
            </Tooltip>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
        </div>
    );
}

export default EditImage;