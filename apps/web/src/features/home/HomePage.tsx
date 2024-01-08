import { Typography } from '@mui/material';
import { RecentMatches } from '../recent-matches/RecentMatches';

export const HomePage = () => (
  <>
    <Typography variant="h1">Recent matches</Typography>
    <RecentMatches />
  </>
);
