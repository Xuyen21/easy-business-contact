import DisplayContacts from './DisplayContacts';
import CalendarUI from './Calendar/CalendarUI'
import { useState } from 'react';
import StatusContext from '../utils/UploadStatusContext';

function BodyContent() {
    const [uploadStatus, setUploadingStatus] = useState(false);

    const updateUploadState = (newValue) => {
        setUploadingStatus(newValue);
    };

    const contextValue = {
        uploadStatus: uploadStatus,
        updateUploadState: updateUploadState,
    };
    return (
        <StatusContext.Provider value={contextValue}>
            <div className="flex-grow grid grid-cols-[40%_57%] mt-3 gap-5 overflow-hidden">
                {/* DisplayContacts Section */}
                <div className='overflow-auto'>
                    <DisplayContacts />
                </div>

                {/* Calendar Section */}
                <div className='grid grid-rows-[20%_80%] h-full overflow-auto'>

                    <div className='row-span-1 text-gray-600 border mb-5 rounded'>
                        {uploadStatus ? <p>Display newly added contact here</p> : <p>Upload failed</p>}
                    </div>
                    <div className='row-span-2 pb-10'>
                        <CalendarUI />
                    </div>
                </div>
            </div>
        </StatusContext.Provider >
    )
}

export default BodyContent;



