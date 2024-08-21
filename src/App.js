import React, { useState } from 'react';

import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="App">
      
      <Dashboard search={search} />
    </div>
  );
};

export default App;
