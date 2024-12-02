import React, { useState, useEffect } from "react";
import { db } from "./db";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const { id: contactId } = useParams();

  useEffect(() => {
    if (contactId) {
      const fetchContact = async () => {
        const docRef = doc(db, "ContactBook", contactId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const contact = docSnap.data();
          setFirstName(contact.firstName);
          setLastName(contact.lastName);
          setEmail(contact.email);
          setId(contactId);
        }
      };
      fetchContact();
    }
  }, [contactId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateDoc(doc(db, "ContactBook", id), {
        firstName,
        lastName,
        email,
      });
    } else {
      await addDoc(collection(db, "ContactBook"), {
        firstName,
        lastName,
        email,
      });
    }
    navigate("/");
  };

  return (
    <div className="add-contact">
      <h2>{id ? "Edit Contact" : "Add New Contact"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? "Update Contact" : "Add Contact"}</button>
      </form>
    </div>
  );
};

export default AddContact;
