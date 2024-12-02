import React, { useState, useEffect } from "react";
import { db } from "./db";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsCol = collection(db, "ContactBook");
      const contactsSnapshot = await getDocs(contactsCol);
      const contactsList = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactsList);
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contact-list">
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <Link to={`/ContactBook/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add New Contact</Link>
    </div>
  );
};

export default ContactList;
