import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore'; // 필요한 모듈만 가져오기

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const querySnapshot = await onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNweets(nweetArray);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

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
    const { target: { value } } = event;
    setNweet(value);
  };

  return ( 
    <div>
      <form onSubmit={onSubmit}>
        <input 
          value={nweet} 
          onChange={onChange} 
          type="text" 
          placeholder='What is on your mind?' 
          maxLength={120}
        />
        <input type="submit" value="Nweet"/>
      </form>
      <div>
        {nweets.map(n => (
          <div key={n.id}>
            <h4>{n.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
