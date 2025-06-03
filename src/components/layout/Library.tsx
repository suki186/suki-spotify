import React from "react";
import EmptyPlaylist from "./EmptyPlaylist";

const Library = () => {
  return (
    <div>
      {/* 플레이리스트가 비어있는 경우 */}
      <EmptyPlaylist />
    </div>
  );
};

export default Library;
