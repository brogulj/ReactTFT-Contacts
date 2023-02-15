import ContactTab from "./ContactTab";
import { auth, database } from "../../firebase";
import { Contact, Gender } from "../../types/types";
import { ref, remove, update } from "firebase/database";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

const ContactsList: React.FC<{ contacts: Contact[] }> = ({ contacts }) => {
    return (
        <section className="contacts__contact-list">
            {contacts.map((contact) => {
                return (
                    <Fragment key={contact.id}>
                        <ContactTab contact={contact}></ContactTab>
                    </Fragment>
                );
            })}
        </section>
    );
};

export default ContactsList;
