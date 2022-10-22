import React from 'react';
import { useTranslation } from 'react-i18next';
import useDetectBreakpoints from '../../utils/hooks/useDetectMUIBreakpoints';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// @ts-ignore
import blob from '../../images/story-blob.png';

export default function StoryRow() {
  const { isLg, isXl } = useDetectBreakpoints();
  const { t } = useTranslation();

  return (
    <Box mx={4} mt={10} mb={5}>
      <Grid container>
        <Grid
          xs={12}
          lg={4}
          sx={{
            margin: isLg || isXl ? 0 : '2% 0',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Stack spacing={2} sx={{ width: '90%' }}>
            <Typography variant="h4" align="center">
              {t('StoryRow.storyTitle')}
            </Typography>
            <Typography variant="h6" component="p" align="center">
              {t('StoryRow.storyBody')}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          lg={4}
          sx={{
            margin: isLg || isXl ? 0 : '2% 0',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              backgroundImage: `url(${blob})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}>
            <Stack spacing={2}>
              <Button
                href="https://demo.shopicsv.app/"
                target="_blank"
                variant="outlined"
                size="large"
                disableElevation>
                {t('Buttons.demoCTA')}
              </Button>
              <Button
                href="https://discord.gg/b9Myw2UmMw"
                target="_blank"
                variant="outlined"
                size="large"
                disableElevation>
                {t('Buttons.discordCTA')}
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid
          xs={12}
          lg={4}
          sx={{
            margin: isLg || isXl ? 0 : '2% 0',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Stack spacing={2} sx={{ width: '90%' }}>
            <Typography variant="h4" align="center">
              {t('StoryRow.devText')}
            </Typography>
            <Typography variant="h6" component="p" align="center">
              {t('StoryRow.devBody')}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
