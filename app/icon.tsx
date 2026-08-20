import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -1,
            lineHeight: 1,
            color: "#f3f3f1",
          }}
        >
          RJ
        </div>
        <div
          style={{
            marginTop: 7,
            width: 22,
            height: 3,
            borderRadius: 2,
            background: "#0a84ff",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
