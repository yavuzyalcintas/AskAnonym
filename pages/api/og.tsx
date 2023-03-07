import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge"
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          color: "white",
          backgroundImage: "url('http://localhost:3000/images/logo.png')",
          backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundSize: "1200px 600px",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
      </div>
    ),
    {
      width: 1200,
      height: 600
    }
  );
}
