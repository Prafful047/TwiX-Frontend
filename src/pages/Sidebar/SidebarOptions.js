import React from 'react'
import './SidebarOptions.css'
import { useTranslation } from 'react-i18next';

const SidebarOptions = ({ active , text , Icon}) => {
  const { t, i18n } = useTranslation();
  return (
    <div className= { `sidebarOptions ${active && 'sidebarOptions_active'}`} >
      <Icon />
      <h2>{text}</h2>
    </div>
  )
}

export default SidebarOptions;