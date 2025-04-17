import { useState } from "react";
import DetailsContent from "./DetailsContent";


function UpdatesContent() {
    return <div className="bg-gray-100 rounded-lg shadow-md p-6 h-full w-full flex items-center justify-center"><h3>Updates</h3><p>Content for Updates goes here.</p></div>;
}

function NotesContent() {
    return <div className="bg-gray-100 rounded-lg shadow-md p-6 h-full w-full flex items-center justify-center"><h3>Notes</h3><p>Content for Notes goes here.</p></div>;
}

function SchedulesContent() {
    return <div className="bg-gray-100 rounded-lg shadow-md p-6 h-full w-full flex items-center justify-center"><h3>Schedules</h3><p>Content for Schedules goes here.</p></div>;
}

export default function Details({ contact }) {
    const [activeTab, setActiveTab] = useState('Details');
    const dummyContact = {
        _id: 'dummy-id-123',
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        phone: '123-456-7890',
        dateOfBirth: '1990-05-15T00:00:00.000Z',
        linkedIn: 'https://www.linkedin.com/in/johndoe',
        company: 'Acme Corp',
        title: 'Software Engineer',
        country: 'USA',
        state: 'CA',
        city: 'San Francisco',
        streetAddress: '123 Main St',
        zipPostalCode: '94105',
        image: 'https://via.placeholder.com/100/4682B4/FFFFFF?Text=JD',
    };

    const contactToDisplay = contact || dummyContact;

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-10 w-[90%] h-full mt-34 overflow-y-auto"> {/* Main container with background, rounded corners, shadow, and overflow hidden */}
            {/* Title Bar */}
            <div className="inline-flex items-center p-4 border-b border-gray-900">
                {contactToDisplay.image_blob ? (
                    <img
                        src={contactToDisplay.image_blob}
                        alt={`${contactToDisplay.first_name} ${contactToDisplay.last_name}`}
                        className="w-8 h-8 rounded-full object-cover mr-2 text-blue-500"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold mr-2">
                        {contactToDisplay.first_name.charAt(0).toUpperCase()}{contactToDisplay.last_name.charAt(0).toUpperCase()}
                    </div>
                )}
                <h2 className="text-lg font-semibold text-gray-800">
                    {contactToDisplay.first_name} {contactToDisplay.last_name}
                </h2>
            </div>
            {/* Styled Header */}
            <div className="flex justify-start border-b border-gray-200 mt-5">
                <button
                    className={`py-3 px-4 text-blue-500 focus:outline-none text-center ${activeTab === 'Details'
                        ? 'bg-gray-200 border-b-2 border-blue-500 font-semibold text-blue-700'
                        : 'hover:bg-gray-100'
                        }`}
                    onClick={() => handleTabClick('Details')}
                >
                    Details
                </button>
                <button
                    className={`py-2 px-4 text-blue-500 focus:outline-none text-center ${activeTab === 'Updates'
                        ? 'bg-gray-200 border-b-2 border-blue-500 font-semibold text-blue-700'
                        : 'hover:bg-gray-100'
                        }`}
                    onClick={() => handleTabClick('Updates')}
                >
                    Updates
                </button>
                <button
                    className={`py-2 px-4 text-blue-500 focus:outline-none text-center ${activeTab === 'Notes'
                        ? 'bg-gray-200 border-b-2 border-blue-500 font-semibold text-blue-700'
                        : 'hover:bg-gray-100'
                        }`}
                    onClick={() => handleTabClick('Notes')}
                >
                    Notes
                </button>
                <button
                    className={`py-2 px-4 text-blue-500 focus:outline-none text-center ${activeTab === 'Schedules'
                        ? 'bg-gray-200 border-b-2 border-blue-500 font-semibold text-blue-700'
                        : 'hover:bg-gray-100'
                        }`}
                    onClick={() => handleTabClick('Schedules')}
                >
                    Schedules
                </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto border border-gray-200"> {/* Make the content area take up remaining height */}
                {activeTab === 'Details' && <DetailsContent contact={contactToDisplay} />}
                {activeTab === 'Updates' && <UpdatesContent />}
                {activeTab === 'Notes' && <NotesContent />}
                {activeTab === 'Schedules' && <SchedulesContent />}
            </div>
        </div>
    );
}