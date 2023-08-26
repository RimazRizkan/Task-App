import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });
  const[_,setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await axios.post("http://localhost:3001/auth/register", {username: inputs.username, password: inputs.password})
        // Handle registration submission
        alert("Registration successful!");
      } else {
        const result = await axios.post("http://localhost:3001/auth/login", {username: inputs.username, password: inputs.password})
        alert("Login successful!");
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        navigate("/tasks")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetState = () => {
    setIsRegister(!isRegister);
    setInputs({ username: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={'column'}
          maxWidth={400}
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={10}
          padding={3}
          boxShadow="5px 5px 10px #ccc"
          borderRadius={3}
          sx={{
            ":hover": {
              boxShadow: '7px 7px 12px #ccc'
            }
          }}
        >
          <Typography variant='h2' padding={2} textAlign='center'>
            {isRegister ? "Register" : "Login"}
          </Typography>
          <TextField
            onChange={handleChange}
            name='username'
            value={inputs.username}
            margin='normal'
            variant='outlined'
            placeholder='Username'
            type='text'
          />
          <TextField
            onChange={handleChange}
            name='password'
            value={inputs.password}
            margin='normal'
            variant='outlined'
            placeholder='Password'
            type='password'
          />
          <Button type='submit' variant='contained' color='primary' sx={{ marginTop: 3, borderRadius: 3 }}>
            {isRegister ? "Register" : "Login"}
          </Button>
          <Button onClick={resetState} sx={{ marginTop: 3 }}>
            Change to {isRegister ? "Login" : "Register"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;








































// import {Box, Button, TextField, Typography} from '@mui/material'



// const Auth = () => {
//     const [isLogin, setIsLogin] = useState(false);
//     const [inputs, setInput] = useState({
//         username: "",
//         password: ""
//     });
//     const [_, setCookies] = useCookies(["access_token"]);

//     const handleChange = (e) => {
//         setInput((prevState) => ({
//             ...prevState,
//             [e.target.name] : e.target.value
//         }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (isLogin) {
//                 await axios.post("http://localhost:3001/auth/register", {username: inputs.username, password: inputs.password})
//                 // Handle login submission
//                 alert("Login successful!");
//             } else {
//                 const result = await axios.post("http://localhost:3001/auth/login", {username: inputs.username, password: inputs.password})
//                 alert("Login successful!");
//                 setCookies("access_token", result.data.token);
//                 window.localStorage.setItem("userID", result.data.userID);
//             }
//           } catch (error) {
//             console.log(error);
//           }
//     }

//     const resetState = () => (
//         setIsLogin(!isLogin),
//         setInput({username: "", password: ""})
//     ) 

//   return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <Box 
//                 display="flex" 
//                 flexDirection={'column'} 
//                 maxWidth={400} 
//                 alignItems="center" 
//                 justifyContent="center" 
//                 margin="auto" 
//                 marginTop={10} 
//                 padding={3} 
//                 boxShadow="5px 5px 10px #ccc"
//                 borderRadius={3}
//                 sx={{
//                     ":hover" : {
//                         boxShadow: '7px 7px 12px #ccc'
//                     }
//                 }}
//                 >
//                     <Typography variant='h2' padding={2} textAlign='center'>{isLogin ? "Login" : "Register"}</Typography>
//                     <TextField onChange={handleChange} name='username' value={inputs.username} margin='normal' variant='outlined'placeholder='Username' type='text'/>
//                     <TextField onChange={handleChange} name='password' value={inputs.password} margin='normal' variant='outlined' placeholder='Password' type='password'/>
//                     <Button type='submit' variant='contained' color='primary' sx={{marginTop: 3, borderRadius: 3}}>Register</Button>
//                     <Button onClick={resetState} sx={{marginTop: 3}}>Change to {isLogin ? "Register" : "Login"}</Button>
//                 </Box>
//             </form>
//         </div>
//     )
// }





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

// export const Auth = () => {
//   return (
//     <div>
//       <h1>Auth Page</h1>
//       <Login />
//       <Register />
//     </div>
//   )
// }


// const Register = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (event) => {  
//         event.preventDefault();  
//         try{
//             await axios.post("http://localhost:3001/auth/register", {username, password})
//             alert("Registration successful!");
            
//         } catch(error) {
//             console.log(error);
//         }
//     }

//     return(
//         <div className="auth-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Register</h2>
//                 <div className="form-group">
//                 <label htmlFor="username">Username:</label>
//                 <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)} />
//                 </div>
//                 <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
//                 </div>
//                 <button type='submit'>Register</button>
//             </form>
//         </div>
//     )
// }


// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [_, setCookies] = useCookies(["access_token"]);

//     const navigate = useNavigate();


//     const handleSubmit = async (event) => {  
//         event.preventDefault();  
//         try{
//             const result = await axios.post("http://localhost:3001/auth/login", {username, password})
//             alert("Login successful!");
//             setCookies("access_token", result.data.token);
//             window.localStorage.setItem("userID", result.data.userID);
//             navigate("/")
//         } catch(error) {
//             console.log(error);
//         }
//     }

//     return(
//         <div className="auth-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Login</h2>
//                 <div className="form-group">
//                 <label htmlFor="username">Username:</label>
//                 <input type='text' id='username' value={username} onChange={(event) => setUsername(event.target.value)} />
//                 </div>
//                 <div className="form-group">
//                 <label htmlFor="password">Password:</label>
//                 <input type='password' id='password' value={password} onChange={(event) => setPassword(event.target.value)} />
//                 </div>
//                 <button type='submit'>Login</button>
//             </form>
//         </div>
//     )
// }