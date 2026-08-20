import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    items.push(items.length);
    setItems(items);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
