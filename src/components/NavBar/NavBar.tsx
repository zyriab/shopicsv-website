import React from 'react';
import { useTranslation } from 'react-i18next';
import useDetectBreakpoints from '../../utils/hooks/useDetectMUIBreakpoints';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// @ts-ignore
import logo from '../../images/ShopiCSVwholeLogo4whiteBg.svg';

const barStyle: React.CSSProperties = {
  height: '80px',
  boxShadow: '0 0 4px grey',
};

export default function NavBar() {
  const { isXs } = useDetectBreakpoints();
  const { t } = useTranslation();

  return (
    <header style={barStyle}>
      <Paper elevation={0} square sx={{ height: '100%' }}>
        <Box
          style={{
            height: '97%',
            padding: '0 4ch',
            borderBottom: '2px solid #178b6e',
          }}>
          <Stack
            direction="row"
            justifyContent={isXs ? 'center' : 'space-between'}
            alignItems="center"
            sx={{ height: '100%' }}>
            <a
              href={
                typeof window !== 'undefined' ? window.location.origin : ''
              }>
              <img style={{ width: 180 }} src={logo} alt="ShopiCSV logo" />
            </a>
            {!isXs && (
              <Stack direction="row" spacing={2}>
                <Button
                  href="#newsletter"
                  variant="outlined"
                  size="large"
                  disableElevation
                  disableRipple>
                  {t('Buttons.newsLetterCTA')}
                </Button>
                <Button
                  target="_blank"
                  href="https://demo.shopicsv.app/"
                  variant="contained"
                  size="large"
                  disableElevation>
                  {t('Buttons.demoCTA')}
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </Paper>
    </header>
  );
}
