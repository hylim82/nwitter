import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import { v4 as uuid } from "uuid";//랜덤id생성

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    // dbService.collection 대신 db.collection 사용
    const unsubscribe = onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    try {
      if(attachment !== "") {
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuid()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
      }
      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };
      await dbService.collection("nweets").add(nweetObj);
      setNweet("");
      setAttachment("");
    } catch (error) {
      console.error("Error adding nweet: ", error);
    }
  };

  const onChange = (event) => {
    const { target: { value } } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachment(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
