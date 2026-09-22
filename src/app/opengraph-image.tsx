import { ImageResponse } from "next/og";

export const alt = "Ali Baba Travel Advisor — Pakistan's Trusted Visa & Travel Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          backgroundColor: "#fbf8f4",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(158,27,38,0.16) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(158,27,38,0.1) 0%, transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "#9e1b26",
              color: "#fbf8f4",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            AB
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#1d1a19" }}>
            Ali Baba Travel Advisor
          </span>
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.15,
            color: "#1d1a19",
            maxWidth: 920,
          }}
        >
          Pakistan&rsquo;s Trusted Visa &amp; Travel Consultancy
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#6b625b",
            maxWidth: 820,
          }}
        >
          Visa Consultancy &middot; International Tours &middot; Flights &middot; Hotel Booking
        </div>
      </div>
    ),
    { ...size }
  );
}
