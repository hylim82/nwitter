import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication 모듈 가져오기

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const authService = getAuth(); // Firebase 인증 객체 가져오기

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  function errorHandle(errorCode) {
    if(errorCode === 'auth/email-already-in-use') {
      setError("if there already exists an account with the given email address.");
    } else if(errorCode === 'auth/invalid-email') {
      setError("the email address is not valid.");
    } else if(errorCode === 'auth/operation-not-allowed') {
      setError("email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.");
    } else if (errorCode === 'auth/weak-password') {
      setError('the password is not strong enough.');
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // Log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      // console.log(error);
      errorHandle(error.code);
        
    }
  };

  const toggleAccout = () => setNewAccount((prev => !prev));

  return (
    <div>
      Auth Page
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder='Email' required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder='Password' required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount  ? "Create Account" : "Log in"} />
        {error}
      </form>
      <span onClick={toggleAccout}>{newAccount ? "Sign In." :"Create Accout"}</span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Apple</button>
      </div>
    </div>
  );
};

export default Auth;