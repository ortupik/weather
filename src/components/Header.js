import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton,
} from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const { getText } = useLanguage();

  return (
    <AppBar position="static" style={{ marginTop: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {getText('appName')}
        </Typography>
        <IconButton size="small">
          <TranslateIcon sx={{ color: 'white' }} />
        </IconButton>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
