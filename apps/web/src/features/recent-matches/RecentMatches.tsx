import { List, ListItem, Typography } from '@mui/material';
import { useGetRecentMatchesQuery } from './recentMatchesApi';

export const RecentMatches = () => {
  const { data, isLoading, error } = useGetRecentMatchesQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  if (error)
    return <Typography color="error">Oh no, there was an error</Typography>;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!data?.matches.length) {
    return <Typography>No matches found</Typography>;
  }

  return (
    <List>
      {data?.matches.map(({ startedAt, matchResult }) => (
        <ListItem key={startedAt.toString()}>
          <Typography>
            {new Date(startedAt).toLocaleDateString()}: {matchResult}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};
