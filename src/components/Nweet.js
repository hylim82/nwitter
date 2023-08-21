import React, { useState } from "react";
import { dbService, storageService  } from "fbase";
import { deleteDoc, doc, updateDoc,  } from "firebase/firestore"; // doc 함수 가져오기
import { getStorage, ref, deleteObject} from "firebase/storage"; // storage에서 필요한 함수 가져오기

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("이 트윗을 지우시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      // Storage에서 이미지 삭제
      if (nweetObj.attachmentUrl) {
        const storageRef = ref(storageService, nweetObj.attachmentUrl);
        await deleteObject(storageRef);
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    const nweetDocRef = doc(dbService, "nweets", nweetObj.id); // 문서 참조 가져오기
    await updateDoc(nweetDocRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <hr/>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="" width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
          <hr/>
        </>
      )}
    </div>
  );
};

export default Nweet;