import "./contacts.scss";
import { auth, database } from "../../firebase";
import { Contact } from "../../types/types";
import { get, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [contact, setContact] = useState<Contact>({
        id: "",
        name: "",
        surname: "",
        favourite: false,
        email: "",
        phone: "",
        pager: "",
        landline: "",
        address: "",
        birthdate: "",
    });

    useEffect(() => {
        if (!user) return;

        const contactRef = ref(
            database,
            "users/" + user?.uid + "/contacts/" + id
        );

        get(contactRef).then((snapshot) => {
            if (snapshot.exists()) {
                setContact(snapshot.val() as Contact);
                Object.entries(snapshot.val() as Contact).forEach(
                    (entry) => {}
                );
            }
        });
    }, []);

    const handleDeleteContact = (id: string) => {
        const approve = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (!approve) return;
        remove(ref(database, "users/" + user?.uid + "/contacts/" + id));
    };

    return (
        <div className="contact__details-wrapper">
            <div className="contact__details">
                <h1>
                    {contact.name} {contact.surname}
                </h1>
                <div className="contacts__details-info">
                    {Object.entries(contact).map((entry) => {
                        if (
                            entry[0] !== "id" &&
                            entry[0] !== "favourite" &&
                            entry[0] !== "name" &&
                            entry[0] !== "surname" &&
                            entry[1] !== ""
                        )
                            return (
                                <div>
                                    <p>
                                        <b>{entry[0]}: </b>
                                        {entry[1]}
                                    </p>
                                </div>
                            );
                    })}
                </div>
            </div>
            <button onClick={() => handleDeleteContact(contact.id)}>
                Delete
            </button>
            <Link to={"/contacts/" + contact.id + "/edit/"}>Edit</Link>
            <button onClick={() => navigate(-1)}>Go back</button>
        </div>
    );
};

export default ViewContact;
