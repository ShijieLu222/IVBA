import { Image, View } from "react-native";

import { colors } from "../../theme";
import { iconCells, type IconName } from "./iconMap";

type AppIconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

export function AppIcon({
  name,
  size = 22,
  color = colors.ink,
}: AppIconProps) {
  const [column, row] = iconCells[name] ?? iconCells.search;
  const cell = size * 1.72;
  const inset = (cell - size) / 2;

  return (
    <View style={{ width: size, height: size, overflow: "hidden" }}>
      <Image
        source={require("../../../assets/artspace/icon-sprite-transparent.png")}
        resizeMode="stretch"
        style={{
          position: "absolute",
          width: cell * 6,
          height: cell * 6,
          left: -column * cell - inset,
          top: -row * cell - inset,
          tintColor: color,
        }}
      />
    </View>
  );
}

export type { IconName };
