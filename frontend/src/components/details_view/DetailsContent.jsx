import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ReceiptTwoToneIcon from '@material-ui/icons/ReceiptTwoTone';
import AddIcCallTwoToneIcon from '@material-ui/icons/AddIcCallTwoTone';
import AlternateEmailTwoToneIcon from '@material-ui/icons/AlternateEmailTwoTone';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import CakeTwoToneIcon from '@material-ui/icons/CakeTwoTone';
import EditImage from '../EditImage';

export default function DetailsContent({ contact }) {
    const contactDeconstructed = {};
    for (const key in contact) {
        if (Object.hasOwnProperty.call(contact, key)) {
            contactDeconstructed[key] = (contact[key] === null || contact[key] === '') ? 'not provided' : contact[key];
        }
    }

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col h-full w-full">
            <div className="flex items-center justify-center mb-4">
                {contact.image_blob ? (
                    <img
                        src={contact.image_blob}
                        alt={`${contact.first_name} ${contact.last_name}`}
                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500" />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-semibold">
                        {contact.first_name.charAt(0).toUpperCase()}{contact.last_name.charAt(0).toUpperCase()}                       
                    </div>
                )}               
            </div>
            <div className='flex justify-center items-center'>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {contact.first_name} {contact.last_name}
            </h2>
            <Tooltip title="Edit" arrow>
                    <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                </Tooltip>
            </div>
            

            <p className="text-center">Company: <span className="text-gray-500  text-sm mb-3">{contactDeconstructed.company}
                <Tooltip title="Edit" arrow>
                    <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                </Tooltip></span> </p>

            <p className='text-center'> Role: <span className="text-gray-500  text-sm mb-3">{contactDeconstructed.role}</span>
                <Tooltip title="Edit" arrow>
                    <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                </Tooltip></p>

            <div className="grid grid-cols-1 gap-3 flex-grow overflow-y-auto"> {/* Added flex-grow and overflow-y-auto */}
                <div className="flex items-center">
                    <MailOutlineTwoToneIcon />
                    <a href={`mailto:${contact.email}`} className="text-gray-700 hover:text-blue-500 ml-2">{contact.email}</a>
                    <Tooltip title="Edit" arrow>
                        <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                    </Tooltip>
                </div>

                <div className="flex items-center">
                    <AddIcCallTwoToneIcon />
                    <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-blue-500 ml-2">{contact.phone}</a>
                    <Tooltip title="Edit" arrow>
                        <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                    </Tooltip>

                </div>

                <div className="flex items-center">
                    <AlternateEmailTwoToneIcon />
                    {contact.linkedin ? <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 hover:underline">linkedin</a> : <p className='ml-2'>LinkedIn: <span className="text-gray-600 text-sm mb-3">{contactDeconstructed.linkedin}</span> </p>}

                    <Tooltip title="Edit" arrow>
                        <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                    </Tooltip>
                </div>
                <div className="flex items-center">
                    <CakeTwoToneIcon />
                    <p className='ml-2'>Born: <span className="text-gray-600 text-sm mb-3">{contactDeconstructed.date_of_birth}</span></p>
                    <Tooltip title="Edit" arrow>
                        <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                    </Tooltip>
                </div>

                {(contact.city || contact.state || contact.country) && (
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0L6.343 16.657a9 9 0 1011.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <p className="text-gray-700">
                            Location: {contact.city}{contact.state && `, ${contact.state}`}{contact.country && `, ${contact.country}`}
                        </p>
                        <Tooltip title="Edit" arrow>
                            <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                        </Tooltip>
                    </div>
                )}
                {contact.streetAddress && contact.zipPostalCode && (
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7-7-7M19 9v10a1 1 0 01-1 1h-3m-4-12H3m2 5h14M5 12h2m10-5h2M6 19h6m-6-1h4"></path></svg>
                        <p className="text-gray-700">
                            Address: {contact.streetAddress}, {contact.zipPostalCode}
                        </p>
                        <Tooltip title="Edit" arrow>
                            <Button style={{ marginLeft: '6px' }}><ReceiptTwoToneIcon fontSize='small' /></Button>
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
}
