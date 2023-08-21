import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // dbService.collection ��� db.collection ���
    const unsubscribe = onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });

    // ������Ʈ�� �𸶿�Ʈ�� �� ���� ����
    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // nweets �÷��ǿ� �� ���� �߰�
      const nweetsRef = collection(dbService, "nweets");
      await addDoc(nweetsRef, {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
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

  const onFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const onClearSelectedImage = () => setSelectedImage(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
        <div>
          {selectedImage && 
            <img src={selectedImage} alt="Selected" style={{ maxWidth: "100px" }} />}
          <input type="file" accept="image/*" onChange={onFileUpload} />
          <button onClick={onClearSelectedImage} >Clear</button>
        </div>
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={userObj && nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
