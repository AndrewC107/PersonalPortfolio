import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Simple generated app icon (no binary asset needed).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 55%, #22c55e 120%)",
          borderRadius: 16,
          color: "white",
          fontWeight: 800,
          fontSize: 30,
          letterSpacing: -1,
        }}
      >
        P
      </div>
    ),
    size
  );
}


