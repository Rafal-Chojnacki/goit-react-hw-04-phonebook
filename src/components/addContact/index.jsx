import React, { useState, useEffect } from "react";
import css from "./addContact.module.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid'
import ContactForm from "../contactForm";
import ContactList from "../contactList";
import PropTypes from "prop-types";

const AddContact = () => {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
  ]);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    const existedContact = contacts.some(
      (contact) =>
        contact.name === newContact.name && contact.number === newContact.number
    );
    if (existedContact) {
      Notify.warning('This contact already exists');
      return;
    }
    newContact.id = nanoid();
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className={css.wrapper}>
      <div className={css.phoneBook}>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
      </div>
      <ContactList
        contacts={contacts}
        deleteContact={deleteContact}
      />
    </div>
  );
}

AddContact.propTypes = {
  contacts: PropTypes.array,
};

export default AddContact;
