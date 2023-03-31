import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: 'favorite',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1
  });
  const { data: watchlistMovies, refetch: refetchWatchlist } = useGetListQuery({
    listName: 'watchlist',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1
  });

  useEffect(()=>{
    refetchFavorites();
    refetchWatchlist();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/'
  }
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>My Profile</Typography>
          <Button color="inherit" onClick={logout}>
            Logout &nbsp; <ExitToApp />
          </Button>
        </Box>

        {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
          <Typography variant="h5"> Add Favourites of Watchlist some movies to see them here!</Typography>
        )
          :
          (<Box>
            <RatedCards title="Favorite Movies" movie={favoriteMovies} />
            <RatedCards title="Watchlist Movies" movie={watchlistMovies} />
          </Box>)
        }
      </Box>
    </>
  )
}

export default Profile;
