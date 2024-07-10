import React, { useEffect, useState } from "react";
import "../Page.css";
import "./Feed.css";
import TweetBox from "./TweetBox";
import Post from "./Post/Post";
import { useTranslation } from 'react-i18next';
import {useTheme} from "../../ThemeContext"

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const {t} = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    fetch("https://twix-backend.onrender.com/post")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts]);

  return (
    <div className="feed">
      <div className="feed__header" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
        {<h2>{t('Home')}</h2> }
      </div>
      <TweetBox />
      {posts.map((p) => (
        <Post key={p._id} p={p} />
      ))}
    </div>
  );
};

export default Feed;
