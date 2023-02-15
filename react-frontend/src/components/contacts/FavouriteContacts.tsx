import "./contacts.scss";
import ContactsList from "./ContactsList";
import { auth, database } from "../../firebase";
import { Contact } from "../../types/types";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";

const ContactsPage = () => {
    const [user, userLoading] = useAuthState(auth);
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        if (user === null || user === undefined) return;

        const query = ref(database, "users/" + user.uid + "/contacts");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();
            let newContacts: Contact[] = [];
            for (let key in data) {
                newContacts.push(data[key]);
            }

            newContacts = newContacts.filter((contact) => {
                if (contact.favourite === true) {
                    return contact;
                }
            });

            setContacts(newContacts);
        });
    }, [user]);

    return (
        <div className="contacts">
            <ContactsList contacts={contacts} />
            <Link to="/contacts">Go to contacts</Link>
            {!user && userLoading !== true && (
                <Navigate to={"/login"}></Navigate>
            )}
        </div>
    );
};

export default ContactsPage;
