// PremiumButton.js
import React from 'react';
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './Sidebar.css';
import { useTranslation } from 'react-i18next';

const PremiumButton = ({onClick}) => {
  const {t} = useTranslation();
  return (
    <Button
      variant="contained"
    //   color="secondary"
      startIcon={<StarIcon />}
      className="premium-button"
      onClick={onClick}
    >
      {t('Premium')}
    </Button>
  );
};

export default PremiumButton;
