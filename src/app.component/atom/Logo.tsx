import Logo from "/image/case_logo_black.png";

interface AppLogoProps {
  width: number;
  height?: number | string;
}
export default function AppLogo({ width, height = "auto" }: AppLogoProps) {
  return <img src={Logo} alt="case-logo" width={width} height={height} />;
}
