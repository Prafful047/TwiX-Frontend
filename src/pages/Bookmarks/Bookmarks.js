import React from 'react'
import '../Page.css'
import { t } from 'i18next';

const Bookmarks = () => {
  return (
    <div className='page'>
      <h2 className='pageTitle'>{t('BookmarksWelcome')}</h2>
    </div>
  )
}

export default Bookmarks
