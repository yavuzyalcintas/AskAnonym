/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge"
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          color: "white",
          backgroundImage: "url('https://www.askanonym.com/images/og.jpg')",
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
      ></div>
    ),
    {
      width: 1200,
      height: 600
    }
  );
}
