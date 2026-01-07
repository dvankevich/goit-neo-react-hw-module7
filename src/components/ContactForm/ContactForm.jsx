import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too Short!")
    .max(50, "Name is too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^(?:\+38)?(\(0\d{2}\)\d{3}-\d{4}|\(0\d{2}\)\d{3}-\d{2}-\d{2}|0\d{9}|\d{3}-\d{2}-\d{2}|0\d{2}-\d{3}-\d{2}-\d{2})$/,
      "Incorrect phone number format. Valid formats: XXX-XX-XX, 0XX-XXX-XX-XX, (0XX)XXX-XXXX, +38(0XX)XXX-XXXX"
    )
    .required("Required!")
    .typeError("Enter phone-number!"),
});

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <label htmlFor={nameFieldId} aria-label="Contact name">
            Name
          </label>
          <Field
            className={`${css.field} ${
              errors.name && touched.name ? css.errorField : ""
            }`}
            type="text"
            name="name"
            id={nameFieldId}
            aria-required="true"
          />
          <ErrorMessage name="name" component="span" className={css.error} />

          <label htmlFor={numberFieldId} aria-label="Phone number">
            Number
          </label>
          <Field
            className={`${css.field} ${
              errors.number && touched.number ? css.errorField : ""
            }`}
            type="text"
            name="number"
            id={numberFieldId}
            aria-required="true"
          />
          <ErrorMessage name="number" component="span" className={css.error} />

          <button
            className={css.btn}
            type="submit"
            aria-label="Add contact button"
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
