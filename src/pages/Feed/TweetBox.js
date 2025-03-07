import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./TweetBox.css";
import axios from "axios";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../../ThemeContext";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const {t} = useTranslation();
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loggedInUser] = useLoggedInUser();
  const user = useAuthState(auth);
  const email = user[0]?.email;
  const theme = useTheme();
  

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];

    const formData = new FormData();
    formData.set("image", image);


    axios
      .post(
        "https://api.imgbb.com/1/upload?key=3e9154106b47968a81e7a4bd989f2aa3",
        formData
      )
      .then((res) => {
        setImageURL(res.data.data.display_url);
        console.log(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleTweet = (e) => {
    e.preventDefault();
    // console.log(user[0].providerData[0].providerId)

    if (user[0].providerData[0].providerId === 'password') {
      fetch(`https://twix-backend.onrender.com/loggedInUser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          setName(data[0]?.name)
          setUsername(data[0]?.username)
        })
    }else{
      
      setName(user[0]?.displayName)
      setUsername(email?.split('@')[0])
      
    }

    console.log(name);
    if (name) {

      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        photo: imageURL,
        username: username,
        name: name,
        email: email,
      };
      console.log(userPost);

      setPost('');
      setImageURL('');

      fetch("https://twix-backend.onrender.com/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input" >
          <Avatar src={userProfilePic} />
          <input
            style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
            type="text"
            placeholder={t('TBPlaceholder')}
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>

        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>Loading image</p>
            ) : (
              <p>{imageURL ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            {t('Tweet')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
