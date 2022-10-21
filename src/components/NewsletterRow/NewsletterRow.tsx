import React, { useState, useRef } from 'react';
import i18next from 'i18next';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useDetectBreakpoints from '../../utils/hooks/useDetectMUIBreakpoints';
import verifyRecaptcha from '../../utils/tools/verifyRecaptcha.utils';
import addSubscriber from '../../utils/queries/addSubscriber.utils';
import emailValidationRegExp from '../../utils/helpers/emailValidationRegExp.helper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

// @ts-ignore
import blob from '../../images/newsletter-blob.png';

const occupations = ['A professional', 'A hobbyist'];

export default function NewsletterRow() {
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [isOccupationError, setIsOccupationError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isRecaptchaError, setIsRecaptchaError] = useState(false);
  const [confirmTextOpacity, setConfirmTextOpacity] = useState('0');
  const [isSubscriptionError, setIsSubscriptionError] = useState(false);

  const { isXs, isSm } = useDetectBreakpoints();
  const { executeRecaptcha } = useGoogleReCaptcha();

  function validateFields() {
    setIsOccupationError(false);
    setIsEmailError(false);
    setIsRecaptchaError(false);

    if (occupation === '') {
      setIsOccupationError(true);
      return false;
    }

    if (email === '' || !emailValidationRegExp.test(email.toLowerCase())) {
      setIsEmailError(true);
      return false;
    }

    return true;
  }

  async function getRecaptchaToken() {
    if (!executeRecaptcha) {
      return;
    }

    return await executeRecaptcha();
  }

  async function handleSubmit() {
    try {
      if (!validateFields()) {
        return;
      }

      let token = await getRecaptchaToken();
      let fetchingToken = false;
      let numOfTries = 0;

      while (token == null) {
        if (fetchingToken === false) {
          setTimeout(async () => (token = await getRecaptchaToken()), 3000);
          numOfTries++;
        }

        if (numOfTries >= 3) {
          setIsRecaptchaError(true);
          return;
        }
      }

      const success = await verifyRecaptcha(token);

      if (success === false) {
        setIsRecaptchaError(true);
        return;
      }

      await addSubscriber({
        email,
        occupation: { name: occupation },
        products: [{ name: 'ShopiCSV', category: 'Shopify' }],
        language: i18next.resolvedLanguage,
      });

      setOccupation('');
      setEmail('');
      setConfirmTextOpacity('1');
    } catch (e) {
      setIsSubscriptionError(true);
      console.error(`Error while subscribing user: ${(e as Error).message}`);
    }
  }

  function handleOccupationChange(event: SelectChangeEvent) {
    setOccupation(event.target.value as string);
  }

  return (
    <Box
      id="newsletter"
      mt={10}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `url(${blob})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}>
      <form onSubmit={async () => await handleSubmit()}>
        <Stack spacing={4}>
          <div>
            <Typography variant="h3" align="center">
              Ready to save time?
            </Typography>
            <Typography variant="h4" align="center">
              Sign up to our newsletter to know when ShopiCSV will be available!
            </Typography>
          </div>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ width: isXs || isSm ? '70%' : '33%' }}>
                <Stack spacing={1}>
                  <FormControl sx={{ width: '60%' }} error={isOccupationError}>
                    <InputLabel id="occupation">I am...</InputLabel>
                    <Select
                      labelId="occupation"
                      label="I am..."
                      error={isOccupationError}
                      value={occupation}
                      onChange={handleOccupationChange}>
                      {occupations.map((o) => (
                        <MenuItem key={o} value={o}>
                          {o}
                        </MenuItem>
                      ))}
                    </Select>
                    {isOccupationError && (
                      <FormHelperText>
                        You need to select an occupation
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={isEmailError}>
                    <TextField
                      placeholder="youremail@email.com"
                      error={isEmailError}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {isEmailError && (
                      <FormHelperText>Invalid email</FormHelperText>
                    )}
                  </FormControl>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <Box sx={{ width: '100%' }}>
                        <FormControl error={isRecaptchaError}>
                          <Button
                            onClick={handleSubmit}
                            variant="contained"
                            size="large"
                            disableElevation>
                            Sign me up!
                          </Button>
                          {isRecaptchaError && (
                            <FormHelperText>
                              Something went wrong when validating the
                              ReCAPTCHA, disable your adblock if you got one or
                              refresh the page and try again
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <div
                        id="recaptcha-container"
                        style={{
                          transform: 'scale(0.77)',
                          transformOrigin: '0 0',
                        }}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </Box>
            <Box>
              <Typography align="center" variant="subtitle2">
                We promise you'll only receive content related to ShopiCSV and
                your mail won't end up in the wrong hands (no spam either)
              </Typography>
              {!isSubscriptionError && (
                <Typography
                  align="center"
                  variant="subtitle2"
                  sx={{
                    color: 'green',
                    transition: 'opacity 0.5s ease',
                    opacity: confirmTextOpacity,
                  }}>
                  Successfully subscribed, a confirmation has been sent to your
                  inbox.
                </Typography>
              )}
              {isSubscriptionError && (
                <Typography
                  align="center"
                  variant="subtitle2"
                  sx={{
                    color: 'red',
                    transition: 'opacity 0.5s ease',
                    opacity: isSubscriptionError ? '1' : '0',
                  }}>
                  Something went wrong, try again later or contact us!
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
