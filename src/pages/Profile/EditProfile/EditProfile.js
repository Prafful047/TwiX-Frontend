import * as React from 'react'
import { Button, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import './EditProfile.css'
import axios from 'axios'
import { useTranslation } from 'react-i18next';


const style = {
  position : 'absolute',
  top : '50%',
  left : '50%',
  transform : 'translate(-50%, -50%)',
  width : 600,
  height : 600,
  bgcolor : 'background.paper',
  boxShadow : 24,
  borderRadius : 8,

}


function EditChild({dob , setDob}) {
  const [open , setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }
  
  const {t} = useTranslation();

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <div className='birthdate-section' onClick={handleOpen}>
        <text>{t('Edit')}</text>
      </div>
      <Modal
           hideBackdrop
           open= {open}
           onClose={handleClose}
           aria-labelledby = "child-modal-title"
           aria-describedby = "child-modal-description"
      >
        <Box sx={{...style , width: 300, height: 400}} >
          <div className='text'>
            <h2>{t('EditQuestion')}</h2>
            <p> {t('EditDescription1')} <br />
            {t('EditDescription2')} <br /> 
            {t('EditDescription3')}</p>
            <input
             type='date'
             onChange={e => setDob(e.target.value)}
             />
             <Button className='e-button' onClick={()=>{setOpen(false)}}>{t('Cancel')}</Button>
          </div>
        </Box>

      </Modal>
    </React.Fragment>
  )
}

export default function EditProfile({user , LoggedInUser}) {

  const [open , setOpen] = React.useState(false);
  const [name , setName] = React.useState('');
  const [bio , setBio] = React.useState('');
  const [location , setLocation] = React.useState('');
  const [website , setWebsite] = React.useState('');
  const [dob , setDob] = React.useState('');
  const {t} = useTranslation();

  const HandleSave = async () => {

    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    }

    if(editedInfo) {
      await axios.patch(`https://twix-backend.onrender.com/userUpdates/${user?.email}` , editedInfo)
      setOpen(false)
    }
    
  }


  return (
    <div>
      <button className='Edit-profile-btn' onClick={()=> setOpen(true)}>{t('EditProfile')}</button>

      <Modal
          open={open}
          aria-labelledby = "modal-modal-title"
          aria-describedby = "modal-modal-description"
      >
        <Box sx={style} className='modal'>
          <div className='header'>
            <IconButton onClick={() => {setOpen(false)}}><CloseIcon /></IconButton>
            <h2 className='header-title'>{t('EditProfile')}</h2>
            <button className='save-btn' onClick={HandleSave}>{t('Save')}</button>
          </div>
          <form className='fill-content'>
            <TextField className='text-field' fullWidth label={t('Name')} id='fullWidth' variant='filled' onChange={(e)=>setName(e.target.value)} defaultValue={LoggedInUser[0]?.name ? LoggedInUser[0]?.name : ''} />
            <TextField className='text-field' fullWidth label={t('Bio')} id='fullWidth' variant='filled' onChange={(e)=>setBio(e.target.value)} defaultValue={LoggedInUser[0]?.bio ? LoggedInUser[0]?.bio : ''} />
            <TextField className='text-field' fullWidth label={t('Location')} id='fullWidth' variant='filled' onChange={(e)=>setLocation(e.target.value)} defaultValue={LoggedInUser[0]?.location ? LoggedInUser[0]?.location : ''} />
            <TextField className='text-field' fullWidth label={t('Website')} id='fullWidth' variant='filled' onChange={(e)=>setWebsite(e.target.value)} defaultValue={LoggedInUser[0]?.website ? LoggedInUser[0]?.website : ''} />

          </form>
          <div className='birthdate-section'>
            <p>{t('BirthDate')}</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob} ></EditChild>
          </div>
          <div className='last-section'>
            {
              LoggedInUser[0]?.dob ?
              <h2>{LoggedInUser[0]?.dob}</h2> :
              <h2>
                {
                  dob ? dob : `${t('AddDate')}`
                }
              </h2>
            }
            <div className='last-btn'>
              <h2>{t('SwitchTP')}</h2>
              <ChevronRightIcon />
            </div>
          </div>

        </Box>
      </Modal>
    </div>
  )
}


