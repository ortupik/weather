import React, { useContext } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="text"
        sx={{ color: 'white' }}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        {language.toUpperCase()}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleLanguageSelect('en')}>English</MenuItem>
        <MenuItem onClick={() => handleLanguageSelect('sw')}>Swahili</MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
