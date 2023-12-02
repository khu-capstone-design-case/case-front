import { Box } from "@mui/material";

export default function Spacer({ x, y }: { x?: number; y?: number }) {
  return <Box marginX={`${x ? x / 2 : 0}px`} marginY={`${y ? y / 2 : 0}px`} />;
}
