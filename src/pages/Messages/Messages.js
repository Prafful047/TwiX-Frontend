import React from 'react'
import '../Page.css'
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const {t} = useTranslation();
  return (
    <div className='page'>
      <h2 className='pageTitle'>{t('MessagesWelcome')}</h2>
    </div>
  )
}

export default Messages