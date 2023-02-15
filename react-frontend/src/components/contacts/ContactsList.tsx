import ContactTab from "./ContactTab";
import { auth, database } from "../../firebase";
import { Contact, Gender } from "../../types/types";
import { ref, remove, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const ContactsList: React.FC<{ contacts: Contact[] }> = ({ contacts }) => {
    return (
        <section className="contacts__contact-list">
            {contacts.map((contact) => {
                return <ContactTab contact={contact}></ContactTab>;
            })}
        </section>
    );
};

export default ContactsList;
