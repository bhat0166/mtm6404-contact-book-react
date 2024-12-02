import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ContactDetail from "./ContactDetail";

function App() {
  return (
    <Router>
      <div>
        <h1>Contact Book</h1>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<AddContact />} />
          <Route path="/ContactBook/:id" element={<ContactDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
