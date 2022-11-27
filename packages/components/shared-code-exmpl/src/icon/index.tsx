import { h } from "preact";
import { useMemo } from "preact/hooks";
import { loadIcon } from "../shared";

type Props = {
  iconType: string;
  width?: number;
  height?: number;
};

export function Icon({ iconType, height = 64, width = 64 }: Props) {
  const iconPath = useMemo(() => loadIcon(iconType), [iconType]);
  return (
    <img
      width={width}
      height={height}
      src={iconPath}
      alt="icons from https://www.svgrepo.com/"
    />
  );
}
