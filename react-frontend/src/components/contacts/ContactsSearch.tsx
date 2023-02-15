import { Contact, Gender } from "../../types/types";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState
    } from "react";
import { Link } from "react-router-dom";

const ContactsSearch: React.FC<{
    contacts: Contact[];
    setContactsToShow: Dispatch<SetStateAction<Contact[]>>;
}> = ({ contacts, setContactsToShow }) => {
    const [nameSearch, setNameSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("favourite");

    useEffect(() => {
        let newContacts = [...contacts];

        newContacts = newContacts.sort((a, b) => {
            if (filter === "favourite") {
                if (a.favourite && !b.favourite) {
                    return -1;
                } else return 1;
            } else if (filter === "name") {
                return (a.name + a.surname).localeCompare(b.name + b.surname);
            } else if (filter === "gender") {
                if (a.gender === Gender.FEMALE && b.gender === Gender.MALE) {
                    return -1;
                }
            } else if (filter === "age" && a.birthdate && b.birthdate) {
                if (a.birthdate > b.birthdate) {
                    return 1;
                }
            }

            return 0;
        });

        setContactsToShow(
            newContacts.filter((contact) => {
                if (
                    (contact.name + contact.surname)
                        .toLocaleLowerCase()
                        .includes(
                            nameSearch.toLocaleLowerCase().replaceAll(" ", "")
                        )
                ) {
                    return contact;
                }
            })
        );
    }, [nameSearch, filter, contacts]);

    return (
        <section className="contacts__nav">
            <input
                type="search"
                onChange={(e) => setNameSearch(e.target.value)}
                className="contacts__search"
                placeholder="Search name..."
            />
            <select
                name="filter"
                id="filter"
                defaultChecked={true}
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
                className="contacts__filter"
            >
                <option value="favourite">FAVOURITE</option>
                <option value="name">NAME</option>
                <option value="gender">GENDER</option>
                <option value="age">AGE</option>
            </select>
            <Link to={"/contacts/add"}>Add new contact +</Link>
        </section>
    );
};

export default ContactsSearch;
