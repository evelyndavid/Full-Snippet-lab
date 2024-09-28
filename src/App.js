// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import HomePage from './HomePage.js';
// import Header from './Header.js';
// // import TeamSection from './TeamSection.js';

// function App() {
//   return (
//     <div className="App">
//       {/* Navigation Bar */}
//       <Header/>
//       {/* HomePage Component */}
//       <HomePage />

//       {/* TeamSection Component */}
//       {/* <TeamSection /> */}
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './Header';
// import Login from './Login.js';
// import SignUp from './SignUp.js';
// import Home from './HomePage.js';
// import './App.css';

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Home/>
//       <Routes>
//         {/* <Route path="/" element={<Header />} /> */}
//         <Route path="/Home" element={<Home />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
      
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Home from './HomePage.js';
import CreateFlashcards from './CreateFlashcards';
import './App.css';
import LoadingScreen from './LoadingScreen.js';
import CodeEditor from './CodeEditor';
const App = () => {
  
  return (
    <Router>
      <LoadingScreen/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/create" element={<CreateFlashcards />} />
        <Route path="/code-editor" element={<CodeEditor />} /> {/* Add route for CodeEditor */}
      </Routes>
    </Router>
  );
};

export default App;

