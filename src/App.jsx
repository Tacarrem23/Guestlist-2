export default function App() {
  return <></>;
}

// App.jsx
import React, { useState } from 'react';

// Placeholder guest data
const guests = [
  { id: 1, name: "Alice Smith", email: "alice@example.com" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com" },
  { id: 3, name: "Charlie Rose", email: "charlie@example.com" },
];

const guestDetails = {
  1: { name: "Alice Smith", email: "alice@example.com", phone: "123-456-7890", bio: "Alice is a software engineer.", job: "Engineer" },
  2: { name: "Bob Johnson", email: "bob@example.com", phone: "987-654-3210", bio: "Bob is a product manager.", job: "Manager" },
  3: { name: "Charlie Rose", email: "charlie@example.com", phone: "555-555-5555", bio: "Charlie is a UX designer.", job: "Designer" },
};

function App() {
  const [selectedGuestId, setSelectedGuestId] = useState(null);

  const handleSelect = (id) => setSelectedGuestId(id);
  const handleBack = () => setSelectedGuestId(null);

  const selectedGuest = guestDetails[selectedGuestId];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Guest List</h1>
      {selectedGuestId ? (
        <div>
          <h2>{selectedGuest.name}</h2>
          <p>Email: {selectedGuest.email}</p>
          <p>Phone: {selectedGuest.phone}</p>
          <p>Job: {selectedGuest.job}</p>
          <p>Bio: {selectedGuest.bio}</p>
          <button onClick={handleBack}>Back</button>
        </div>
      ) : (
        <ul>
          {guests.map(guest => (
            <li key={guest.id} onClick={() => handleSelect(guest.id)} style={{ cursor: 'pointer' }}>
              <strong>{guest.name}</strong> - {guest.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { useGuests } from './hooks/useGuests';
import { useGuestDetails } from './hooks/useGuestDetails';

function App() {
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const { guests, loading: guestsLoading } = useGuests();
  const { guest, loading: detailsLoading } = useGuestDetails(selectedGuestId);

  const handleSelect = (id) => setSelectedGuestId(id);
  const handleBack = () => setSelectedGuestId(null);

  if (guestsLoading) return <p>Loading guests...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Guest List</h1>
      {selectedGuestId ? (
        detailsLoading ? (
          <p>Loading guest details...</p>
        ) : (
          <div>
            <h2>{guest.name}</h2>
            <p>Email: {guest.email}</p>
            <p>Phone: {guest.phone}</p>
            <p>Job: {guest.job}</p>
            <p>Bio: {guest.bio}</p>
            <button onClick={handleBack}>Back</button>
          </div>
        )
      ) : (
        <ul>
          {guests.map(guest => (
            <li key={guest.id} onClick={() => handleSelect(guest.id)} style={{ cursor: 'pointer' }}>
              <strong>{guest.name}</strong> - {guest.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

