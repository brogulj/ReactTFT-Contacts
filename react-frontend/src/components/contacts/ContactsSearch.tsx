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

    const stringIncludes = (string: string, search: string) => {
        if (
            string
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase().replaceAll(" ", ""))
        ) {
            return true;
        }
        return false;
    };

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
                if (searchBy === "name") {
                    if (
                        contact.name
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
                } else if (searchBy === "surname") {
                    if (stringIncludes(contact.surname, searchByValue)) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "email") {
                    if (
                        contact.email &&
                        stringIncludes(contact.email, searchByValue)
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "phone") {
                    if (
                        contact.phone &&
                        stringIncludes(contact.phone, searchByValue)
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "pager") {
                    if (
                        contact.pager &&
                        stringIncludes(contact.pager, searchByValue)
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "landline") {
                    if (
                        contact.landline &&
                        stringIncludes(contact.landline, searchByValue)
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "address") {
                    if (
                        contact.address &&
                        stringIncludes(contact.address, searchByValue)
                    ) {
                        return contact;
                    }

                    return false;
                } else if (searchBy === "birthdate") {
                    if (
                        contact.birthdate !== undefined &&
                        (contact.birthdate
                            .toLocaleLowerCase()
                            .replaceAll("-0", "")
                            .replaceAll("-", "")
                            .includes(
                                searchByValue
                                    .toLocaleLowerCase()
                                    .replaceAll(" ", "")
                                    .replaceAll(".", "")
                            ) ||
                            contact.birthdate
                                .toLocaleLowerCase()
                                .replaceAll("-0", "")
                                .replaceAll("-", "")
                                .includes(
                                    searchByValue
                                        .split(".")
                                        .reverse()
                                        .join("")
                                        .toLocaleLowerCase()
                                        .replaceAll(" ", "")
                                        .replaceAll("/", "")
                                ))
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
            <div className="sort">
                Sort by
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
            </div>
            <div className="include">
                Include:
                <select
                    name="include"
                    id="include"
                    onChange={(e) => setTypesToInclude(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="pager">Pager</option>
                    <option value="landline">Landline</option>
                    <option value="address">Address</option>
                </select>
            </div>
            <div className="search-by">
                <input
                    type="text"
                    placeholder="Search by..."
                    onChange={(e) => setSearchByValue(e.target.value)}
                />
                <select
                    name="searchby"
                    id="seacrhby"
                    onChange={(e) => setSearchBy(e.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="surname">Surname</option>
                    <option value="birthdate">Birthdate</option>
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
