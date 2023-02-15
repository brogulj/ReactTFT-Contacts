import { Contact, Gender } from "../../types/types";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState
    } from "react";
import { Link } from "react-router-dom";

const ContactsSearch: React.FC<{
    contacts: Contact[];
    setContactsToShow: Dispatch<SetStateAction<Contact[]>>;
}> = ({ contacts, setContactsToShow }) => {
    const [nameSearch, setNameSearch] = useState<string>("");
    const [searchBy, setSearchBy] = useState<string>("name");
    const [searchByValue, setSearchByValue] = useState<string>("");
    const [filter, setFilter] = useState<string>("favourite");
    const [typesToInclude, setTypesToInclude] = useState<string>("all");

    useEffect(() => {
        let newContacts = [...contacts];

        newContacts = newContacts
            .sort((a, b) => {
                if (filter === "favourite") {
                    if (a.favourite && !b.favourite) {
                        return -1;
                    } else return 1;
                } else if (filter === "name") {
                    return (a.name + a.surname).localeCompare(
                        b.name + b.surname
                    );
                } else if (filter === "gender") {
                    if (
                        a.gender === Gender.FEMALE &&
                        b.gender === Gender.MALE
                    ) {
                        return -1;
                    }
                } else if (filter === "age" && a.birthdate && b.birthdate) {
                    if (a.birthdate > b.birthdate) {
                        return 1;
                    }
                }

                return 0;
            })
            .filter((contact) => {
                if (typesToInclude === "all") return true;
                if (typesToInclude === "email" && contact.email) {
                    return true;
                }
                if (typesToInclude === "phone" && contact.phone) {
                    return true;
                }
                if (typesToInclude === "pager" && contact.pager) {
                    return true;
                }
                if (typesToInclude === "landline" && contact.landline) {
                    return true;
                }
                if (typesToInclude === "address" && contact.address) {
                    return true;
                }
                return false;
            })
            .filter((contact) => {
                console.log("filtering contac");
                console.log(searchBy);
                console.log(searchByValue);
                if (searchBy === "name") {
                    if (
                        (contact.name + contact.surname)
                            .toLocaleLowerCase()
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                            )
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "email") {
                    if (
                        contact.email !== undefined &&
                        contact.email
                            .toLocaleLowerCase()
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                            )
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "phone") {
                    if (
                        contact.phone !== undefined &&
                        contact.phone
                            .toLocaleLowerCase()
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                            )
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "pager") {
                    if (
                        contact.pager !== undefined &&
                        contact.pager
                            .toLocaleLowerCase()
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                            )
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "landline") {
                    if (
                        contact.landline !== undefined &&
                        contact.landline
                            .toLocaleLowerCase()
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                            )
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "address") {
                    if (
                        contact.address !== undefined &&
                        contact.address
                            .toLocaleLowerCase()
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                            )
                    ) {
                        return contact;
                    }

                    return false;
                }
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
    }, [nameSearch, filter, contacts, typesToInclude, searchByValue, searchBy]);

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
            <select
                name="include"
                id="include"
                onChange={(e) => setTypesToInclude(e.target.value)}
            >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="pager">Pager</option>
                <option value="landline">Landline</option>
                <option value="address">Address</option>
            </select>
            <div className="search-by">
                <input
                    type="text"
                    placeholder="Search by some value"
                    onChange={(e) => setSearchByValue(e.target.value)}
                />
                <select
                    name="searchby"
                    id="seacrhby"
                    onChange={(e) => setSearchBy(e.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="surname">Surname</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="pager">Pager</option>
                    <option value="landline">Landline</option>
                    <option value="address">Address</option>
                </select>
            </div>
            <Link to={"/contacts/add"}>Add new contact +</Link>
        </section>
    );
};

export default ContactsSearch;
