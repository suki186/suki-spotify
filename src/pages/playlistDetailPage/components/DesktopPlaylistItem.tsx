import React from "react";
import { PlaylistTrack } from "../../../models/playlist";
import { styled, TableCell, TableRow } from "@mui/material";
import { Episode, Track } from "../../../models/track";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

// Duration 포맷팅 mm:ss
function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Date added 포맷팅 yyyy.mm.dd
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}.${month}.${day}`;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  // Episode인지 Track인지
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track; // Episode
  };

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "no name"}</TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TableCell>
      <TableCell>
        {item.added_at ? formatDate(item.added_at) : "unknown"}
      </TableCell>
      <TableCell>
        {item.track.duration_ms
          ? formatDuration(item.track.duration_ms)
          : "unknown"}
      </TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
