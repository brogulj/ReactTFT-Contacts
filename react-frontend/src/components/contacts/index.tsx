import "./contacts.scss";
import ContactsList from "./ContactsList";
import ContactsSearch from "./ContactsSearch";
import { auth, database } from "../../firebase";
import { Contact, Gender } from "../../types/types";
import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const ContactsPage = () => {
    const [user, userLoading, error] = useAuthState(auth);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [contactsToShow, setContactsToShow] = useState<Contact[]>([]);

    useEffect(() => {
        if (user === null || user === undefined) return;

        const query = ref(database, "users/" + user.uid + "/contacts");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();
            const contacts: Contact[] = [];
            for (let key in data) {
                contacts.push(data[key]);
            }
            setContacts(contacts);
            setContactsToShow(contacts);
        });
    }, [user]);

    return (
        <div className="contacts">
            <ContactsSearch
                contacts={contacts}
                setContactsToShow={setContactsToShow}
            />
            <ContactsList contacts={contactsToShow} />
            {!user && userLoading !== true && (
                <Navigate to={"/login"}></Navigate>
            )}
        </div>
    );
};

export default ContactsPage;
