import { Image, StyleSheet, View } from "react-native";

type BrandLockupProps = {
  compact?: boolean;
};

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <View
      style={[styles.brandCrop, compact && styles.brandCropCompact]}
      accessibilityLabel="Artspace Lifespace"
    >
      <Image
        source={require("../../../assets/artspace/brand-board.png")}
        style={[styles.brandImage, compact && styles.brandImageCompact]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  brandCrop: { width: 176, height: 48, overflow: "hidden" },
  brandCropCompact: { width: 142, height: 39 },
  brandImage: {
    position: "absolute",
    width: 300,
    height: 155,
    left: -59,
    top: 0,
  },
  brandImageCompact: { width: 242, height: 126, left: -48 },
});
