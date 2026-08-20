import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#07080a",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1,
            color: "#f3f3f1",
          }}
        >
          RJ
        </div>
        <div
          style={{
            marginTop: 18,
            width: 60,
            height: 6,
            borderRadius: 3,
            background: "#0a84ff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
