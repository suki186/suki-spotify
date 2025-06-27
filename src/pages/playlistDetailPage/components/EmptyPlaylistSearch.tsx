import { InputAdornment, styled, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import ErrorMessage from "../../../components/common/components/ErrorMessage";
import SearchResultList from "./SearchResultList";

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
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });
  console.log("search", data);

  // 키워드 검색 핸들러
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const tracks = data?.pages[0]?.tracks?.items ?? []; //널 병합 연산자
  const hasResults = tracks.length > 0; // 검색 결과가 있는가
  const hasSearched = keyword.trim() !== ""; // 검색어가 있는가

  return (
    <div>
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

      {!isLoading && hasResults && <SearchResultList list={tracks} />}
      {!isLoading && hasSearched && !hasResults && (
        <Typography mt={2}>{`검색 결과가 없습니다: "${keyword}"`}</Typography>
      )}
    </div>
  );
};

export default EmptyPlaylistSearch;
