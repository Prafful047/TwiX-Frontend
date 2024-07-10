import React from 'react'
import '../Page.css'
import { useTranslation } from 'react-i18next';

const Lists = () => {
  const {t} = useTranslation();
  return (
    <div className='page'>
      <h2 className='pageTitle'>{t('ListsWelcome')}</h2>
    </div>
  )
}

export default Lists