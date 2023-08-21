// * 참조 : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import Nweet from "components/Nweet";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"; // storage에서 필요한 함수 가져오기
import { v4 as uuid } from "uuid";

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
    try {
      // nweets 컬렉션에 새 문서 추가
      const nweetsRef = collection(dbService, "nweets");

      let attachmentUrl = "";
      if (attachment) {
        const storageRef = ref(getStorage()); // storage reference 생성
        const attachmentRef = ref(storageRef, `${userObj.uid}/${uuid()}`); // 랜덤 id 생성
        await uploadString(attachmentRef, attachment, "data_url"); // 이미지 업로드

        attachmentUrl = await getDownloadURL(attachmentRef); // 이미지 다운로드 URL 가져오기
      }

      await addDoc(nweetsRef, {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl
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

  // useState의 상태 업데이트는 비동적으로 처리되어, 확인을 위해 useEffect사용 for debug
  // useEffect(() => {
  //   console.log("attachment:", attachment);
  // }, [attachment]);

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
