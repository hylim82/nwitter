import React from 'react';

const Nweets = ({ nweets, isOwner }) => {
  return (
    <div>
      {nweets.map(nweet => (
        <div key={nweet.id}>
          <h4>{nweet.text}</h4>
          {isOwner === nweet.creatorId ? <>
          <button>Edit Nweet</button>
          <button>Delete Nweet</button>
          </> : ""}
        </div>
      ))}
    </div>
  );
};

export default Nweets;
