import React from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EditorRow from '../EditorRow/EditorRow';
import FileExplorerRow from '../FileExplorerRow/FileExplorerRow';
import FiltersRow from '../FiltersRow/FiltersRow';
import CodeEditorRow from '../CodeEditorRow/CodeEditorRow';
import RoadmapRow from '../RoadmapRow/RoadmapRow';
import NewsletterRow from '../NewsletterRow/NewsletterRow';
import StoryRow from '../StoryRow/StoryRow';
import BackToTopBtn from '../BackToTopBtn/BackToTopBtn';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

export default function MainContent() {
  const { t } = useTranslation();

  return (
    <>
      <Stack>
        <EditorRow />
        <Box bgcolor="#dceee9" width="100%">
          <Stack>
            <Stack justifyContent="center">
              <Box mt={5} sx={{ textAlign: 'center' }}>
                <Typography variant="h3">{t('FeaturesBlock.title')}</Typography>
                <Typography variant="h5">
                  {t('FeaturesBlock.subtitle')}
                </Typography>
              </Box>
            </Stack>
            <FileExplorerRow />
            <FiltersRow />
            <CodeEditorRow />
            <RoadmapRow />
            <NewsletterRow />
            <StoryRow />
          </Stack>
        </Box>
      </Stack>
      <BackToTopBtn />
      <LanguageSelector />
    </>
  );
}
