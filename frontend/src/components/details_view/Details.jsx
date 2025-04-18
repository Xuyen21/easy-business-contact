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

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-10 w-[90%] h-full mt-34 overflow-y-auto"> {/* Main container with background, rounded corners, shadow, and overflow hidden */}
            {/* Title Bar */}
            <div className="inline-flex items-center p-4 border-b border-gray-900">
                {contact.image_blob ? (
                    <img
                        src={contact.image_blob}
                        alt={`${contact.first_name} ${contact.last_name}`}
                        className="w-8 h-8 rounded-full object-cover mr-2 text-blue-500"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold mr-2">
                        {contact.first_name.charAt(0).toUpperCase()}{contact.last_name.charAt(0).toUpperCase()}
                    </div>
                )}
                <h2 className="text-lg font-semibold text-gray-800">
                    {contact.first_name} {contact.last_name}
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
                {activeTab === 'Details' && <DetailsContent contact={contact} />}
                {activeTab === 'Updates' && <UpdatesContent />}
                {activeTab === 'Notes' && <NotesContent />}
                {activeTab === 'Schedules' && <SchedulesContent />}
            </div>
        </div>
    );
}