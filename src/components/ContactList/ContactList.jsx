import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/selectors";
import { selectNameFilter } from "../../redux/selectors";
import css from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.contactList}>
      {visibleContacts.map((contact) => {
        return (
          <Contact
            key={contact.id}
            contact={contact}
            // deleteContact
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
