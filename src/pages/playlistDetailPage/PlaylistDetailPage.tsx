import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import {
  Box,
  Grid,
  styled,
  TableBody,
  TableCell,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../components/common/components/LoadingSpinner";
import ErrorMessage from "../../components/common/components/ErrorMessage";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(36, 134, 209, 0.5) 100%)",
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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  maxHeight: "calc(100vh - 390px)",
  height: "100%",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  marginTop: "8px",
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: playlist } = useGetPlaylist({ playlist_id: id ?? "" });
  const { ref, inView } = useInView();

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id ?? "", limit: PAGE_LIMIT });
  console.log("playlist", playlistItems);

  useEffect(() => {
    // inView가 true이면 다음페이지(fetchNextPage) 가져오기
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (id === undefined) return <Navigate to="/" />; // url에 id 없을 경우

  if (isPlaylistItemsLoading) return <LoadingSpinner />;
  if (playlistItemsError)
    return <ErrorMessage errorMessage={playlistItemsError.message} />;

  return (
    <>
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
      {playlist?.tracks?.total === 0 ? (
        <Typography>Search</Typography>
      ) : (
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pIn) =>
                page.items.map((item, iIn) => {
                  return (
                    <DesktopPlaylistItem
                      key={iIn}
                      item={item}
                      index={pIn * PAGE_LIMIT + iIn + 1} // 넘버링(#)
                    />
                  );
                })
              )}
              <TableRow sx={{ height: "5px" }} ref={ref} />
              {isFetchingNextPage && <LoadingSpinner />}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
    </>
  );
};

export default PlaylistDetailPage;
