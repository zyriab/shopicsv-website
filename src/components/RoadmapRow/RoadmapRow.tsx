import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// @ts-ignore
import prodBlob from '../../images/prod-blob.png';
// @ts-ignore
import visualBlob from '../../images/visual-blob.png';
// @ts-ignore
import translationBlob from '../../images/translation-blob.png';

export default function RoadmapRow() {
  const { t } = useTranslation();

  return (
    <Box mx="10%" mt={15}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" align="center">
            {t('RoadMapRow.title')}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{ whiteSpace: 'pre-line' }}>
            {t('RoadMapRow.subtitle')}
          </Typography>
        </Box>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Grid
            xs={12}
            md={4}
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: 255,
                height: 181,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${prodBlob})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
              <Typography variant="h5" align="center">
                {t('RoadMapRow.feature1')}
              </Typography>
            </Box>
          </Grid>
          <Grid
            xs={12}
            md={4}
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: 255,
                height: 181,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${visualBlob})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ whiteSpace: 'pre-line' }}>
                {t('RoadMapRow.feature2')}
              </Typography>
            </Box>
          </Grid>
          <Grid
            xs={12}
            md={4}
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                width: 255,
                height: 181,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(${translationBlob})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}>
              <Typography variant="h5" align="center">
                {t('RoadMapRow.feature3')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
