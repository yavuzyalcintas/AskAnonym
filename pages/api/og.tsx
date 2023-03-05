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
          background:
            "linear-gradient(90deg, rgba(79,9,121,1) 9%, rgba(173,0,255,1) 94%)",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        AskAnonym
        <p
          style={{
            fontSize: 30
          }}
        >
          Send anoynmous questions!
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 600
    }
  );
}
