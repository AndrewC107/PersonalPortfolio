import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Simple generated Apple touch icon (no binary asset needed).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111827 0%, #1d4ed8 55%, #0ea5e9 120%)",
          borderRadius: 40,
          color: "white",
          fontWeight: 800,
          fontSize: 84,
          letterSpacing: -2,
        }}
      >
        P
      </div>
    ),
    size
  );
}


