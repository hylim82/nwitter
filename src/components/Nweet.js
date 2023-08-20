import React, { useState } from "react";
import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore"; // doc 함수 가져오기

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    console.log('deltetClickAndnweetObjid:'+nweetObj.id);
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
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
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;