import { Box } from "@mui/material";

export default function Spacer({ x, y }: { x?: number; y?: number }) {
  return <Box marginX={`${x}px`} marginY={`${y}px`} />;
}
