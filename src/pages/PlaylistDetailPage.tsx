import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../hooks/useGetPlaylist";
import { Box, Grid, styled, Typography } from "@mui/material";
import useGetPlaylistItems from "../hooks/useGetPlaylistItems";
import LoadingSpinner from "../components/common/components/LoadingSpinner";
import ErrorMessage from "../components/common/components/ErrorMessage";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});

const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  width: "100%",
  maxWidth: "250px",
  aspectRatio: "1", // 정사각형 비율 유지
  objectFit: "cover",
  height: "auto",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id ?? "" });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id ?? "", limit: 10 });
  console.log("playlist", playlistItems);

  if (id === undefined) return <Navigate to="/" />; // url에 id 없을 경우

  if (isPlaylistItemsLoading) return <LoadingSpinner />;
  if (playlistItemsError)
    return <ErrorMessage errorMessage={playlistItemsError.message} />;

  return (
    <PlaylistHeader container spacing={7}>
      <ImageGrid>
        {playlist?.images ? (
          <AlbumImage src={playlist?.images[0].url} alt="playlist_cover" />
        ) : (
          <AlbumImage src="/images/no-image.png" alt="playlist_cover" />
        )}
      </ImageGrid>
      <Grid>
        <Box>
          <ResponsiveTypography variant="h1" color="white">
            {playlist?.name}
          </ResponsiveTypography>

          <Box display="flex" alignItems="center">
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
            />
            <Typography
              variant="subtitle1"
              color="white"
              ml={1}
              fontWeight={700}
            >
              {playlist?.owner?.display_name
                ? playlist?.owner.display_name
                : "unknown"}
            </Typography>
            <Typography variant="subtitle1" color="white">
              • {playlist?.tracks?.total} songs
            </Typography>
          </Box>
        </Box>
      </Grid>
    </PlaylistHeader>
  );
};

export default PlaylistDetailPage;
