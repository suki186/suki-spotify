import { styled, Typography } from "@mui/material";
import React from "react";
import PlayButton from "./PlayButton";

// 카드 전체
const CardContainer = styled("div")(({ theme }) => ({
  minWidth: "160px",
  width: "100%",
  height: "100%",
  padding: "12px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

// 앨범 이미지
const AlbumImage = styled("img")({
  width: "100%",
  borderRadius: "8px",
  marginBottom: "5px",
});

// 제목, 가수
const TextTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

// 재생 버튼
const OverlayButton = styled("div")({
  position: "absolute",
  bottom: "20px",
  right: "8px",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

interface CardProps {
  name: string | undefined;
  image: string | undefined;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "relative" }}>
        <AlbumImage src={image} />
        <OverlayButton className="overlay">
          <PlayButton />
        </OverlayButton>
      </div>
      <TextTypography variant="h2">{name || "No Name"}</TextTypography>
      <TextTypography variant="body1" color="text.secondary">
        {artistName || "No Artist"}
      </TextTypography>
    </CardContainer>
  );
};

export default Card;
