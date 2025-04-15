const ContactCard = ({ contactList }) => {
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
                    </figcaption>
                </figure>
            ))
            }
        </div >
    );
};

export default ContactCard;