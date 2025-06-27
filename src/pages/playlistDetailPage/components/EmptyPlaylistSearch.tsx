import {
  Box,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import ErrorMessage from "../../../components/common/components/ErrorMessage";
import SearchResultList from "./SearchResultList";
import { Track } from "../../../models/track";

const SearchContainer = styled(Box)({
  // 스크롤 디자인
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "50px",
    backgroundColor: theme.palette.action.active,
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const EmptyPlaylistSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });
  console.log("search", data);

  // 키워드 검색 핸들러
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const tracks = (
    data?.pages.flatMap((page) => page.tracks?.items) ?? []
  ).filter((track): track is Track => !!track); //널 병합 연산자
  const hasResults = tracks.length > 0; // 검색 결과가 있는가
  const hasSearched = keyword.trim() !== ""; // 검색어가 있는가

  return (
    <SearchContainer>
      <Typography variant="h1" my="10px">
        Let's Find a Song For Your Playlist!
      </Typography>
      <StyledTextField
        value={keyword}
        autoComplete="off"
        variant="outlined"
        placeholder="듣고 싶은 노래를 검색해 보세요!"
        fullWidth
        slotProps={{
          // 아이콘
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
        onChange={handleSearchKeyword}
      />

      {error && <ErrorMessage errorMessage={error.message} />}
      {isLoading && <LoadingSpinner />}

      {!isLoading && hasResults && (
        <SearchResultList
          list={tracks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
      {!isLoading && hasSearched && !hasResults && (
        <Typography mt={2}>{`검색 결과가 없습니다: "${keyword}"`}</Typography>
      )}
    </SearchContainer>
  );
};

export default EmptyPlaylistSearch;
