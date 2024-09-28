import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

function CreateFlashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedFlashcard, setExpandedFlashcard] = useState(null);
  const [username, setUsername] = useState(''); 

  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); 
    }
  }, []);

  const addFlashcard = () => {
    const newFlashcard = { id: Date.now(), title: '', body: '', created: new Date(), username: username };
    setFlashcards([...flashcards, newFlashcard]);
    setCurrentFlashcard(newFlashcard);
    setIsEditing(true);
  };

  const updateFlashcard = (key, value) => {
    setCurrentFlashcard({ ...currentFlashcard, [key]: value });
  };

  const saveFlashcard = async () => {
    
    try {
      await axios.post('http://localhost:5000/flashcards', {
        username: currentFlashcard.username,
        title: currentFlashcard.title,
        body: currentFlashcard.body,
      });

      setFlashcards(flashcards.map(f => f.id === currentFlashcard.id ? currentFlashcard : f));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving flashcard:', error);
    }
  };

  const deleteFlashcard = (id) => {
    setFlashcards(flashcards.filter(f => f.id !== id));
    if (currentFlashcard && currentFlashcard.id === id) {
      setCurrentFlashcard(null);
      setIsEditing(false);
    }
  };

  const toggleEdit = (flashcard) => {
    if (currentFlashcard && currentFlashcard.id === flashcard.id) {
      setIsEditing(!isEditing);
    } else {
      setCurrentFlashcard(flashcard);
      setIsEditing(true);
    }
  };

  const toggleExpand = (id) => {
    setExpandedFlashcard(expandedFlashcard === id ? null : id);
  };

  
  const getMyFlashcards = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/flashcards/${username}`);
      setFlashcards(response.data); 
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  return (
    <div style={{
      backgroundColor: '#1f2833',
      color: 'white',
      padding: '20px',
      height: '100vh',
      overflowY: 'auto',
    }}>
      <h1>Welcome, {username}</h1> {}
      
      <div className="d-flex flex-column flex-md-row justify-content-center mb-4" style={{ display: 'flex', gap: '10px' }}>
        <button
          style={{
            backgroundColor: '#fff',
            border: 'none',
            padding: '5px 15px',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease',
            color: '#000',
            borderRadius: '5px',
            marginBottom: '10px',
            width: 'auto',
          }}
          onClick={addFlashcard}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#28f0ceba'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          Add New Flashcard
        </button>
            
        <button
          style={{
            backgroundColor: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '1.2rem',
            transition: 'background-color 0.3s ease',
            color: '#000',
            borderRadius: '5px',
            marginLeft: '0',
            width: 'auto',
            marginBottom: '10px',
          }}
          onClick={getMyFlashcards}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#28f0ceba'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
        >
          Get My Flashcards
        </button>
      </div>

      <div className="row" style={{ overflowY: 'auto', paddingRight: '15px' }}>
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div
              style={{
                backgroundColor: expandedFlashcard === flashcard.id ? '#28f0ceba' : '#3f4e5a',
                color: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                cursor: 'pointer',
                padding: '20px',
                textAlign: 'center',
                transform: expandedFlashcard === flashcard.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: expandedFlashcard === flashcard.id ? '0 6px 10px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => toggleExpand(flashcard.id)}
            >
              <div className="card-body">
                <h5 style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}>
                  {flashcard.title || 'Untitled'}
                </h5>
                <p style={{ fontSize: '1rem', color: '#ccc' }}>
                  Created on: {new Date(flashcard.created).toLocaleString()}
                </p>
                {expandedFlashcard === flashcard.id && (
                  <p style={{ fontSize: '1rem', color: '#ccc' }}>{flashcard.body || 'No content yet.'}</p>
                )}
                <div className="d-flex justify-content-between">
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      border: 'none',
                    }}
                    onClick={() => toggleEdit(flashcard)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: '#dc3545',
                      border: 'none',
                    }}
                    onClick={(e) => { e.stopPropagation(); deleteFlashcard(flashcard.id); }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
                {isEditing && currentFlashcard.id === flashcard.id && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      value={currentFlashcard.title}
                      onChange={(e) => updateFlashcard('title', e.target.value)}
                      style={{
                        backgroundColor: '#3f4e5a',
                        border: 'none',
                        color: 'white',
                        marginTop: '10px',
                      }}
                      className="form-control"
                    />
                    <textarea
                      placeholder="Enter your notes here"
                      value={currentFlashcard.body}
                      onChange={(e) => updateFlashcard('body', e.target.value)}
                      style={{
                        backgroundColor: '#3f4e5a',
                        border: 'none',
                        color: 'white',
                        marginTop: '10px',
                      }}
                      className="form-control mt-2"
                    />
                    <button
                      style={{
                        backgroundColor: '#28f0ceba',
                        border: 'none',
                        marginTop: '10px',
                      }}
                      onClick={saveFlashcard}
                      className="btn btn-success btn-sm mt-2"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateFlashcards;