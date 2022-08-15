import { Logo } from "components";
import { useHttpLocations } from "hooks";
import React from "react";

export default function ListLogo({ logoURI, size = "24px", alt }: { logoURI?: string; size: string; alt?: string }) {
  const srcs: string[] = useHttpLocations(logoURI);

  return <Logo alt={alt} width={size} height={size} srcs={srcs} />;
}
