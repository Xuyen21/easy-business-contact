const ContactCard = ({ contactList }) => {
    return (
        <div className="flex flex-wrap">
            {contactList?.map((contact, index) => (
                <figure
                    className="bg-white text-white rounded-lg shadow-md p-4 m-2 inline-flex"
                    key={index}  // Adjust width as needed
                >
                    <img
                        alt="user"
                        className="w-32 h-32 rounded-full mr-4" // Add margin right
                        src={contact.picture.large}
                    />
                    <figcaption>
                        <p className="text-gray-700 font-semibold text-xl mb-2">
                            {contact.name.first} {contact.name.last}
                        </p>
                        <table class="table-auto">
                            <tbody>
                                <tr>
                                    <td><span className="font-medium">email: </span></td>
                                    <td>{contact.email}</td>
                                </tr>
                                <tr>
                                    <td><span className="font-medium">phone: </span></td>
                                    <td>{contact.cell}</td>
                                </tr>
                                <tr>
                                    <td><span className="font-medium">city: </span></td>
                                    <td>{contact.location.city}</td>
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