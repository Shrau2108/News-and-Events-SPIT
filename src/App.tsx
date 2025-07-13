import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NewsEvents } from './components/NewsEvents';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-900" id="main-content">
      <Header />
      <Hero />
      <NewsEvents />
    </div>
  );
}

export default App;