import React, { useState, useEffect } from 'react';
import './Java.css';

const Java = () => {
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
      content: `Variables are used to store data in Java. They can be of different types like int, float, String, etc.`,
      syntax: `Basic Syntax:\nint age = 25;\nString name = "John";`,
    },
    {
      title: 'Classes',
      content: `Classes define the blueprint for objects. They encapsulate data and methods that operate on the data.`,
      syntax: `Basic Syntax:\npublic class Person {\n    String name;\n    int age;\n}`,
    },
    {
      title: 'Objects',
      content: `Objects are instances of classes. They represent real-world entities and have attributes and behaviors.`,
      syntax: `Basic Syntax:\nPerson person = new Person();`,
    },
    {
      title: 'Methods',
      content: `Methods define actions that objects can perform. They can take parameters and return values.`,
      syntax: `Basic Syntax:\npublic int add(int a, int b) {\n    return a + b;\n}`,
    },
    {
      title: 'Strings',
      content: `Strings are sequences of characters. They are immutable and can be manipulated using various methods.`,
      syntax: `Basic Syntax:\nString greeting = "Hello, World!";`,
    },
    {
      title: 'Conditional Statements',
      content: `Conditional statements control the flow of execution based on conditions.`,
      syntax: `Basic Syntax:\nif (age >= 18) {\n    System.out.println("Adult");\n} else {\n    System.out.println("Minor");\n}`,
    },
    {
      title: 'Loops',
      content: `Loops allow repeated execution of code. Common types are for and while loops.`,
      syntax: `Basic Syntax:\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}`,
    },
    {
      title: 'Arrays',
      content: `Arrays are used to store multiple values of the same type in a single variable.`,
      syntax: `Basic Syntax:\nint[] numbers = {1, 2, 3, 4, 5};`,
    },
  ];

  return (
    <div className="java-wrapper">
      <h2 className="java-heading">Java Flashcards</h2>
      <div className="java-container">
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

export default Java;