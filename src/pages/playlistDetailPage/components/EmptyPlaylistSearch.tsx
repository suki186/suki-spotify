import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";

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

  return (
    <div>
      <Typography variant="h1" my="10px">
        Let's Find a Song For Your Playlist!
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} />
    </div>
  );
};

export default EmptyPlaylistSearch;
