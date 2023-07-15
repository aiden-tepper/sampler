import { Button, Row, Col, Container } from 'react-bootstrap'
import { useState, useContext } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';


const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [regUsername, setRegUsername] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLoginClick = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_BE_DOMAIN}:${process.env.REACT_APP_BE_PORT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await response.json();
    console.log(response);
    console.log(data);

    if (data.status == 201) {
      login();
      nav('/');
    } else {
      alert(data.message);
    }
  }

  const handleRegisterClick = async () => {
    if (regPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    process.env.REACT_APP_
    const response = await fetch(`http://${process.env.REACT_APP_BE_DOMAIN}:${process.env.REACT_APP_BE_PORT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: regUsername,
        password: regPassword
      })
    });

    const data = await response.json();
    console.log(response);
    console.log(data);

    if (data.status === 201) {
      alert(data.message);
      setRegPassword("");
      setRegUsername("");
      setConfirmPassword("");
    } else {
      alert(data.message);
    }
  }

  return <div>
    <Container className="align_center" fluid>
      <Row >

        <Col className="border">
          <h1>Login</h1>
          <p>username</p>
          <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
          <p>password</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <br />
          <Button onClick={handleLoginClick}>Login</Button>
        </Col>

        <Col></Col>

        <Col className="border">
          <h1>Register</h1>
          <p>username</p>
          <input value={regUsername} onChange={(e) => setRegUsername(e.target.value)}></input>
          <p>password</p>
          <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></input>
          <p>confirm password</p>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
          <br />
          <Button onClick={handleRegisterClick}>Register</Button>
        </Col>

      </Row>
    </Container>
  </div>
}


export default Login;