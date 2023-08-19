import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication 모듈 가져오기

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const auth = getAuth(); // Firebase 인증 객체 가져오기

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        <input type="submit" value={newAccount === true ? "Create Account" : "Log in"} />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Apple</button>
      </div>
    </div>
  );
};

export default Auth;