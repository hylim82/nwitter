import React, { useState } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc } from 'firebase/firestore'; // 필요한 모듈만 가져오기

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // nweets 컬렉션에 새 문서 추가
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now()
      });

      setNweet("");
    } catch (error) {
      console.error("Error adding nweet: ", error);
    }
  };

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