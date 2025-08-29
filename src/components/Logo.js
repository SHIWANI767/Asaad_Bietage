import SettingsContext from "@/context/SettingsContext";
import Image from "next/image";
import React, { useContext } from "react";

const Logo = (props) => {
  const themeSetting = useContext(SettingsContext);

  return themeSetting.settings.theme === "DARK" ? (
    <Image
      height={44}
      width={159}
      quality={100}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      src="/images/logo.svg"
      alt="Dark Mode Logo"
      {...props}
    />
  ) : (
    <Image
      height={44}
      width={159}
      quality={100}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      src="/images/light_logo.svg"
      alt="Light Mode Logo"
      {...props}
    />
  );
};

export default Logo;
