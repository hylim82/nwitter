import React, { useState } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const onChange = (event) => {
    const {target:{value}} = event;
    //console.log(value);
    setNweet(value);
    // TODO: 이값을 database에 전송
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          value={nweet} 
          onChange={onChange} 
          type="text" 
          placeholder='What is your mind?' 
          maxLength={120}/>
        <input type="submit" value="Nweet"/>
      </form>
      {/* 테스트 용 */}
      Text:{nweet}
    </div>
  );
};

export default Home;