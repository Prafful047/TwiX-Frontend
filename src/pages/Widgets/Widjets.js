import React, { useState, useEffect } from "react";
import "./Widgets.css";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTheme } from "../../ThemeContext";

const Widjets = ({ userEmail }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();

  const handleLanguageChange = async (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    console.log(`Selected language: ${selectedLanguage}`);

    if (!otpVerified) {
      try {
        console.log(`Sending OTP to ${userEmail}`);
        await axios.post('https://twix-backend.onrender.com/send-otp', { email: userEmail });
        setOtpSent(true);
        setModalOpen(true);
        console.log('OTP sent, modal open state:', modalOpen);
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    } else {
      i18n.changeLanguage(selectedLanguage);
      setOtpVerified(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpVerification = async () => {
    try {
      console.log(`Verifying OTP for ${userEmail}`);
      await axios.post('https://twix-backend.onrender.com/verify-otp', { email: userEmail, otp });
      setOtpVerified(true);
      setModalOpen(false);
      console.log('OTP verified, changing language to:', language);
      i18n.changeLanguage(language);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widgets_searchIcon" />
        <input type="text" placeholder={t('SBPlaceholder')} />
      </div>

      <div className="widgets_languageSelector">
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="te">Telugu</option>
        </select>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="otp-modal-title"
        aria-describedby="otp-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 id="otp-modal-title">Enter the OTP sent to your email</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            style={{ marginBottom: '1rem', padding: '0.5rem', fontSize: '1rem', width: '100%' }}
          />
          <button
            onClick={handleOtpVerification}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
          >
            Submit
          </button>
        </Box>
      </Modal>

      <div className="widgets_widgetContainer">
        <h2>{t('TBPlaceholder')}</h2>
        <TwitterTweetEmbed tweetId={"1557187138352861186"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default Widjets;
