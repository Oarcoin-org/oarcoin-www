import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Oarcoin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PRIMARY = "#e75e27";

async function getLogoDataUri() {
  try {
    const svg = await readFile(
      path.join(process.cwd(), "public/assets/logo.svg"),
      "utf8"
    );
    return svg.match(/data:image\/png;base64,[A-Za-z0-9+/=]+/)?.[0] ?? null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const logo = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        {logo ? (
          <img src={logo} width={520} height={520} alt="Oarcoin" />
        ) : (
          <div style={{ fontSize: 140, fontWeight: 700, color: PRIMARY }}>Oarcoin</div>
        )}
      </div>
    ),
    { ...size }
  );
}
