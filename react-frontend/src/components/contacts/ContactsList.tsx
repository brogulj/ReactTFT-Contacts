import ContactTab from "./ContactTab";
import { Contact } from "../../types/types";
import { Fragment } from "react";

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
