import React, { useState } from 'react';
import i18next from 'i18next';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useDetectBreakpoints from '../../utils/hooks/useDetectMUIBreakpoints';
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

// @ts-ignore
import blob from '../../images/newsletter-blob.png';

const occupations = [
  'A Shopify merchant',
  'A freelance translator',
  'A hobbyist',
];

export default function NewsletterRow() {
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdatesOptIn, setIsUpdatesOptIn] = useState(false);
  const [isOccupationError, setIsOccupationError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const { isXs, isSm } = useDetectBreakpoints();
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function recaptchaVerify() {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha();
    return token;
  }

  async function handleSubmit() {
    setIsOccupationError(false);
    setIsEmailError(false);

    const emailValidationRegExp =
      /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (occupation === '') {
      setIsOccupationError(true);
      return;
    }

    // TODO: check if email looks valid
    if (email === '' || !emailValidationRegExp.test(email)) {
      setIsEmailError(true);
      return;
    }

    const token = await recaptchaVerify();

    const payload = {
      occupation,
      email,
      products: isUpdatesOptIn ? 'SHOPIFY' : 'SHOPICSV',
      lang: i18next.resolvedLanguage,
      token,
    };

    // call API (infos + token)
    const res = await fetch('API_URL', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     secret: '6LcUv2kiAAAAAAXHqyhyuf4OF3wSgVbKqw_rK_o_',
    //     response: token,
    //   }),
    // });

    console.log(res);
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
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={isUpdatesOptIn}
                          onChange={(e) => setIsUpdatesOptIn(e.target.checked)}
                        />
                      }
                      label="Also keep me updated on new Shopify tools by Metaoist Dsgn"
                    />
                  </FormGroup>
                  <Box sx={{ width: '100%' }}>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      size="large"
                      disableElevation>
                      Sign me up!
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Typography align="center" variant="subtitle2">
              We promise you'll only receive content related to ShopiCSV and
              your mail won't end up in the wrong hands (no spam either)
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
