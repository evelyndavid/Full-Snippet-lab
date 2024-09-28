// src/components/Flashcards.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FlashCards.css';

function Flashcards() {
  return (
    <div className="flashcards-container">
      <h1 className='heading'>Explore the languages</h1>
      <p>Select a programming language to explore its syntax.</p>
      <div className="flashcard-buttons">
        <Link to="/java">
          <button className="btn-lang">Java</button>
        </Link>
        <Link to="/python">
          <button className="btn-lang">Python</button>
        </Link>
        <Link to="/c">
          <button className="btn-lang">C</button>
        </Link>
      </div>
    </div>
  );
}

export default Flashcards;