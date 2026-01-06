import "./App.css";
import ContactForm from "./ContactForm/ContactForm.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import SearchBox from "./SearchBox/SearchBox.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectError } from "../redux/selectors";
import { fetchContacts } from "../redux/operations.js";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <div>
        {isLoading && !error && <p className="blinking">Loading contacts...</p>}
        {error && <p>{error}</p>}
      </div>
      <div className={isLoading && !error ? "disabled" : ""}>
        <ContactList />
      </div>
    </>
  );
}

export default App;
