import { Container, type SxProps } from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container fixed disableGutters maxWidth="xs" sx={layoutStyle}>
      {children}
    </Container>
  );
}

export default Layout;

const layoutStyle: SxProps = {
  height: "100vh",
  overflow: "hidden",
  bgcolor: "var(--color-gray-background)",
};
