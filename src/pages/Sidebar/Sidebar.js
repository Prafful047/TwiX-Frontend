import React, { useState } from "react";
import "./Sidebar.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import DoneIcon from "@mui/icons-material/Done";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import HistoryIcon from '@mui/icons-material/History';
import { FaCrown } from 'react-icons/fa'
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import CustomLink from "./CustomLink";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import PremiumButton from "./PremiumButton";
import PremiumModal from "./Premium/PremiumModal";
import { useTranslation } from 'react-i18next';

const Sidebar = ({ handleLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const loggedInUser = useLoggedInUser();
  const { t } = useTranslation();

  // console.log(loggedInUser)

  // const userProfilePic = loggedInUser[0]?.profileImage
  //   ? loggedInUser[0]?.profileImage
  //   : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePremiumClick = () => {
    setPremiumModalOpen(true);
  }

  const handlePremiumClose = () => {
    setPremiumModalOpen(false);
  }

  // console.log(loggedInUser[0][0].subscription);

  const result = user[0]?.email?.split("@")[0];
  // console.log(user);


  return (
    <div className="sidebar">
      <div className="icon-premium">
        <TwitterIcon className="sidebar_twitterIcon" />
        {loggedInUser[0][0]?.subscription ? 
        <FaCrown style={{ color: 'gold', fontSize: '24px' }} /> :  
        <PremiumButton onClick={handlePremiumClick}/>
        }
      </div>
      <CustomLink to="/home/feed">
        <SidebarOptions active Icon={HomeIcon} text={t('Home')} />
      </CustomLink>
      <CustomLink to="/home/explore">
        <SidebarOptions active Icon={SearchIcon} text={t('Explore')} />
      </CustomLink>
      <CustomLink to="/home/notifications">
        <SidebarOptions active Icon={NotificationsIcon} text={t('Notifications')} />
      </CustomLink>
      <CustomLink to="/home/messages">
        <SidebarOptions active Icon={MailOutlineIcon} text={t('Messages')} />
      </CustomLink>
      <CustomLink to="/home/bookmarks">
        <SidebarOptions active Icon={BookmarkBorderIcon} text={t('Bookmarks')} />
      </CustomLink>
      <CustomLink to="/home/lists">
        <SidebarOptions active Icon={ListAltIcon} text={t('Lists')} />
      </CustomLink>
      <CustomLink to="/home/profile">
        <SidebarOptions active Icon={PermIdentityIcon} text={t('Profile')} />
      </CustomLink>
      <CustomLink to="/home/login-history">
        <SidebarOptions Icon={HistoryIcon} text={t('LoginHistory')} />
      </CustomLink>
      <CustomLink to="/home/more">
        <SidebarOptions active Icon={MoreIcon} text={t('More')} />
      </CustomLink>

      <Button variant="outlined" className="sidebar_tweet">
        {t('Tweet')}
      </Button>

      <div className="Profile_info">
        <Avatar src={loggedInUser[0][0]?.profileImage ? loggedInUser[0][0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
        <div className="user_info">
          <h4>
            {loggedInUser[0][0]?.name
              ? loggedInUser[0][0]?.name
              : user && user[0]?.displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClick={handleClose}
          onClose={handleClose}
        >
          <MenuItem className="Profile_info1">
            <Avatar src={loggedInUser[0][0]?.profileImage ? loggedInUser[0][0]?.profileImage : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
            <div className="user_info subUser_info">
              <div className="user_info">
                <h4>
                  {loggedInUser[0]?.name
                    ? loggedInUser[0]?.name
                    : user && user[0]?.displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done-icon">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>{t('AddExistingAccount')}</MenuItem>
          <MenuItem onClick={handleLogout}>Log out @AwadhiyaPrafful</MenuItem>
        </Menu>
      </div>
      <PremiumModal open={isPremiumModalOpen} handleClose={handlePremiumClose} userEmail={user[0]?.email} />
    </div>
  );
};

export default Sidebar;
