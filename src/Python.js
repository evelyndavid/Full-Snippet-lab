import React, { useState, useEffect } from 'react';
import './Python.css';

const Python = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Close the card when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectedCard !== null && !event.target.closest('.card')) {
        setSelectedCard(null); // Close the card if clicked outside
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedCard]);

  // Function to handle card click (open/expand card)
  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  // Function to close the card when clicking the "X" button
  const handleCloseCard = (event, index) => {
    event.stopPropagation(); // Prevent triggering card click event
    if (selectedCard === index) {
      setSelectedCard(null); // Close the card when "X" is clicked
    }
  };

  const cards = [
    {
      title: 'Variables',
      content: `Variables are used to store data in Python. They can hold different data types like int, float, str, etc.`,
      syntax: `Basic Syntax:\nage = 25\nname = "John"`,
    },
    {
      title: 'Functions',
      content: `Functions are blocks of reusable code that perform a specific task.`,
      syntax: `Basic Syntax:\ndef add(a, b):\n    return a + b`,
    },
    {
      title: 'Lists',
      content: `Lists are used to store multiple items in a single variable.`,
      syntax: `Basic Syntax:\nnumbers = [1, 2, 3, 4, 5]`,
    },
    {
      title: 'Conditional Statements',
      content: `Conditional statements allow for decision-making in code.`,
      syntax: `Basic Syntax:\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")`,
    },
    {
      title: 'Loops',
      content: `Loops are used for iterating over a sequence (like a list or a string).`,
      syntax: `Basic Syntax:\nfor i in range(5):\n    print(i)`,
    },
    {
      title: 'Dictionaries',
      content: `Dictionaries store data values in key:value pairs.`,
      syntax: `Basic Syntax:\nperson = {"name": "John", "age": 30}`,
    },
  ];

  return (
    <div className="python-wrapper">
      <h2 className="python-heading">Python Flashcards</h2>
      <div className="python-container">
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-6 col-md-3 mb-4" key={index}>
              <div
                className={`card ${selectedCard === index ? 'selected' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-content">{card.content}</p>
                  {/* Conditionally render the syntax only if the card is selected */}
                  {selectedCard === index && (
                    <div className="syntax-container">
                      <pre>{card.syntax}</pre>
                    </div>
                  )}

                  {/* Close button for the expanded card */}
                  {selectedCard === index && (
                    <button
                      className="close-btn"
                      onClick={(e) => handleCloseCard(e, index)}
                    >
                      &times;
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Python;