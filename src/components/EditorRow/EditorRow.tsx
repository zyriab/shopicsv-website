import React from 'react';
import { useTranslation } from 'react-i18next';
import useDetectBreakpoints from '../../utils/hooks/useDetectMUIBreakpoints';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// @ts-ignore
import editorMain from '../../images/editor-main.png';

export default function EditorRow() {
  const { isXs, isLg, isXl } = useDetectBreakpoints();
  const { t } = useTranslation();

  return (
    <Box mx={isXl ? 20 : 4} mt={10} mb={10}>
      <Grid
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isLg || isXl ? 'space-between' : 'center',
        }}>
        <Grid xs={12} sm={8} lg={4}>
          <Stack spacing={2}>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  marginBottom: '5%',
                }}>
                {t('EditorRow.title')}
              </Typography>
              <Typography variant="h5">
                {t('EditorRow.description')}
              </Typography>
              <Typography variant="h6">
                {t('EditorRow.bottomNote')}
              </Typography>
            </Box>
            <Box>
              <Button
                href="https://demo.shopicsv.app/"
                target="_blank"
                variant="contained"
                size="large"
                disableElevation>
                {t('Buttons.demoCTA')}
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid xs={12} lg={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: isLg || isXl ? 'end' : 'center',
            }}>
            <img
              style={{ maxWidth: '823px' }}
              src={editorMain}
              alt="The ShopiCSV editor"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
