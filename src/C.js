import React, { useState, useEffect } from 'react';
import './C.css';

const C = () => {
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
      content: `Variables are used to store data in C. They can be of different types like int, float, char, etc.`,
      syntax: `Basic Syntax:\nint age = 25;\nchar name[] = "John";`,
    },
    {
      title: 'Functions',
      content: `Functions are blocks of code that perform a specific task and can return a value.`,
      syntax: `Basic Syntax:\nint add(int a, int b) {\n    return a + b;\n}`,
    },
    {
      title: 'Arrays',
      content: `Arrays are used to store multiple values of the same type in a single variable.`,
      syntax: `Basic Syntax:\nint numbers[] = {1, 2, 3, 4, 5};`,
    },
    {
      title: 'Conditional Statements',
      content: `Conditional statements control the flow of execution based on conditions.`,
      syntax: `Basic Syntax:\nif (age >= 18) {\n    printf("Adult");\n} else {\n    printf("Minor");\n}`,
    },
    {
      title: 'Loops',
      content: `Loops allow repeated execution of code. Common types are for and while loops.`,
      syntax: `Basic Syntax:\nfor (int i = 0; i < 5; i++) {\n    printf("%d", i);\n}`,
    },
    {
      title: 'Pointers',
      content: `Pointers store the address of a variable, enabling direct memory access.`,
      syntax: `Basic Syntax:\nint *ptr;\nptr = &age;`,
    },
  ];

  return (
    <div className="c-wrapper">
      <h2 className="c-heading">C Flashcards</h2>
      <div className="c-container">
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

export default C;