// import React, { useState } from "react";
// import { Container } from "react-bootstrap";

// const SignUp = ({ setPage, onSignUp }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleHome = () => {
//     window.location.href = '/'; 
//     };

//     const handleLogin = () => {
//       window.location.href = '/Login'; 
//   };

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     if (name && email && password && confirmPassword) {
//       if (password === confirmPassword) {
        
//         handleHome();
//       } else {
//         alert("Passwords do not match!");
//       }
//     } else {
//       alert("Please fill all fields.");
//     }
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',  
//       minWidth: '100vw',  
//       backgroundColor: '#1F2833',
//       margin: 0,
//     },
//     wrapper: {
//       marginTop: '50px',
//       marginBottom: '1000px',
//       width: '450px',
//       height: '100%',
//       alignItems: 'center',
//       marginRight: '20px',
//       background: 'rgba(237, 231, 231, 0.5)',
//       border: '2px solid rgba(20, 19, 19, 0.2)',
//       borderRadius: '12px',
//       padding: '30px 40px',
//       boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
//       backdropFilter: 'blur(9px)',
//       color: '#fff',
//     },
//     heading: {
//       fontSize: '36px',
//       textAlign: 'center',
//       marginBottom: '20px',
//     },
//     inputBox: {
//       position: 'relative',
//       color: 'white',
//       width: '100%',
//       height: '50px',
//       margin: '20px 0',
//     },
//     input: {
//       width: '100%',
//       height: '100%',
//       background: 'transparent',
//       border: 'none',
//       outline: 'none',
      
//       borderRadius: '40px',
//       fontSize: '16px',
//       color: '#fff',
//       padding: '20px 45px 20px 20px',
//     },
//     button: {
//       width: '100%',
//       height: '45px',
//       background: '#fff',
//       border: 'none',
//       outline: 'none',
//       borderRadius: '40px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, .1)',
//       cursor: 'pointer',
//       fontSize: '16px',
//       color: '#333',
//       fontWeight: '600',
//     },
//     registerLink: {
//       fontSize: '14.5px',
//       textAlign: 'center',
//       margin: '20px 0 15px',
//     },
//     link: {
//       color: '#fff',
//       textDecoration: 'none',
//       fontWeight: '600',
//     },
//   };

//   return (
//     <Container style={styles.container}>
//       <div style={styles.wrapper}>
//         <h1 style={styles.heading}>Sign Up for Snippet Lab</h1>
//         <form onSubmit={handleSignUp}>
//           <div style={styles.inputBox}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.inputBox}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.inputBox}>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.inputBox}>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               style={styles.input}
//             />
//           </div>
//           <button type="submit" style={styles.button}>Sign Up</button>
//           <div style={styles.registerLink}>
//             <p>
//               Already have an account? 
//               <button 
//                onClick={handleLogin} 
//                 style={{ 
//                   ...styles.link, 
//                   background: 'none', 
//                   border: 'none', 
//                   color: '#fff', 
//                   cursor: 'pointer' 
//                 }}
//               >
//                 Login
//               </button>
//             </p>
//           </div>
//         </form>
//       </div>
//     </Container>
//   );
// };

// export default SignUp;











import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const SignUp = ({ setPage, onSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleHome = () => {
    window.location.href = '/'; 
  };

  const handleLogin = () => {
    window.location.href = '/Login'; 
  };

  

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post('http://localhost:5000/signup', {
            name,
            email,
            password,
          });
          alert(response.data.message); // Show success message
          handleHome(); // Redirect after successful sign-up
        } catch (error) {
          alert("Error signing up: " + (error.response?.data?.error || error.message));
        }
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please fill all fields.");
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',  
      minWidth: '100vw',  
      backgroundColor: '#1F2833',
      margin: 0,
    },
    wrapper: {
      marginTop: '50px',
      marginBottom: '1000px',
      width: '450px',
      height: '100%',
      alignItems: 'center',
      marginRight: '20px',
      background: 'rgba(237, 231, 231, 0.5)',
      border: '2px solid rgba(20, 19, 19, 0.2)',
      borderRadius: '12px',
      padding: '30px 40px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 1.0)',
      backdropFilter: 'blur(9px)',
      color: '#fff',
    },
    heading: {
      fontSize: '36px',
      textAlign: 'center',
      marginBottom: '20px',
    },
    inputBox: {
      position: 'relative',
      color: 'white',
      width: '100%',
      height: '50px',
      margin: '20px 0',
      
    },
    input: {
      width: "100%",
                height: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                border: "2px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "40px",
                fontSize: "16px",
                color: "#fff",
                padding: "20px 45px 20px 20px",
       
    }
    
    ,
    button: {
      width: '100%',
      height: '45px',
      background: '#fff',
      border: 'none',
      outline: 'none',
      borderRadius: '40px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#333',
      fontWeight: '600',
      
    },
    registerLink: {
      fontSize: '14.5px',
      textAlign: 'center',
      margin: '20px 0 15px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };
  return (
    <Container style={styles.container}>
      <div style={styles.wrapper}>
      <h1 style={{
  fontSize: '32px', // Adjust the font size as needed
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#000', // Change this to your desired text color
  textShadow: '0 2px 4px rgba(40, 240, 206, 0.9), 0 4px 8px rgba(0, 0, 0, 0.3)' // Shiny shadow effect
}}>
  Sign Up for Snippet Lab
</h1>

        <form onSubmit={handleSignUp}>
          <div style={styles.inputBox}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputBox}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button 
  type="submit" 
  style={styles.button} 
  onMouseEnter={(e) => {
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6)'; // Add shadow on hover
    e.target.style.backgroundColor = '#28f0ceba'; // Change background color on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.boxShadow = 'none'; // Remove shadow when not hovered
    e.target.style.backgroundColor = 'transparent'; // Reset background color when not hovered
  }}
>
  Sign Up
</button>
          <div style={styles.registerLink}>
            <p>
              Already have an account? 
              <button 
                onClick={handleLogin} 
                style={{ 
                  ...styles.link, 
                  background: 'none', 
                  border: 'none', 
                  color: '#fff', 
                  cursor: 'pointer' 
                }}
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
