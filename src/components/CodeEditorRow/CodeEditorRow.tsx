import React from 'react';
import { useTranslation } from 'react-i18next';
import useDetectBreakpoints from '../../utils/hooks/useDetectMUIBreakpoints';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// @ts-ignore
import codeEditor from '../../images/code-editor.png';

export default function CodeEditorRow() {
  const { isLg, isXl } = useDetectBreakpoints();
  const { t } = useTranslation();

  return (
    <Box mt={10}>
      <Container>
        <Stack justifyContent="center" spacing={0}>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack alignItems="start">
              <Typography variant="h5">{t('CodeEditorRow.title')}</Typography>
              <img
                src={codeEditor}
                alt="On the right: a strandard spreadsheet app, making it hard to read HTML code - on the left: ShopiCSV's specialized editor, with a 'replace and filter' tool opened and text coloring"
              />
            </Stack>
          </Box>
          <Box
            style={{ display: 'flex', justifyContent: 'end', marginTop: 40 }}>
            <Box style={{ width: isLg || isXl ? '60%' : '100%' }}>
              <Typography variant="h5" sx={{whiteSpace: 'pre-line'}}>{t('CodeEditorRow.text')}</Typography>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
