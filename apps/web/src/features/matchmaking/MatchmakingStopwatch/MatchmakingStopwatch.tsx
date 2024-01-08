import { Typography } from '@mui/material';
import { useStopwatch } from '@/hooks/useStopwatch';

export const MatchmakingStopwatch = () => {
  const { seconds } = useStopwatch();

  return <Typography variant="h2">{seconds}</Typography>;
};
