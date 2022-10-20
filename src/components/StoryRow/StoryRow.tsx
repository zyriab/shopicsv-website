import React from 'react';
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
          }}
        >
          <Stack spacing={2} sx={{ width: '90%' }}>
            <Typography variant="h4" align="center">
              Forged in fire
            </Typography>
            <Typography variant="h6" component="p">
              ShopiCSV was born out of necessity, seeing how time consuming and
              inneficient it was to edit CSV files in a standard spreadsheet
              editor, we tasked ourselves with the mission to come up with a
              tool that would be easy to use, customizable and restful for the
              eyes.
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              backgroundImage: `url(${blob})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
            }}
          >
            <Stack spacing={2}>
              <Button
                href="https://demo.shopicsv.app/"
                target="_blank"
                variant="outlined"
                size="large"
                disableElevation
              >
                Try the demo
              </Button>
              <Button
                href="https://discord.gg/b9Myw2UmMw"
                target="_blank"
                variant="outlined"
                size="large"
                disableElevation
              >
                Chat with us on Discord
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
          }}
        >
          <Stack spacing={2} sx={{ width: '90%' }}>
            <Typography variant="h4" align="center">
              Enjoy direct help from accessible developers
            </Typography>
            <Typography variant="h6" component="p">
              We know that what makes a great tool is the ability for the
              developers to tweak and improve it based on the requests and
              feedback of the userbase. By being part of the ShopiCSV community,
              you will be able to talk directly to the developers in order to
              seek help or request new features.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
