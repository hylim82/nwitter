import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    //console.log(event.target.name); // 입력이 제대로 동작되는지 확인
    const {target:{name, value}} = event; // TODO : 이게 이해가 잘안됨
    // console.log(value); // 입력이 제대로 동작되는지 확인
    if(name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div>
      Auth Page
      <form onSubmit={onSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder='Email' required
          value={email}
          onChange={onChange} // 변경될 때마다, onChange event발생
          />
        <input 
          name="password" 
          type="password" 
          placeholder='Password' required
          value={password}
          onChange={onChange} // 변경될 때마다, onChange event발생
          />
        <input type="submit" value="Log in"/>
      </form>
      <div>
        <button>Continute with google</button>
        <button>Continute with google</button>
      </div>
    </div>
  );
};

export default Auth;