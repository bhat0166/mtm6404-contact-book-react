import React, { useState, useEffect } from "react";
import { db } from "./db";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const ContactDetail = () => {
  const [contact, setContact] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "ContactBook", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "ContactBook", id));
    navigate("/");
  };

  return (
    <div className="contact-detail">
      {contact ? (
        <>
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
          <p>Email: {contact.email}</p>
          <button onClick={handleDelete}>Delete Contact</button>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit Contact</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ContactDetail;
