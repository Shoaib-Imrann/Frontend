import React, { useRef } from "react";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);
  const data = [
    {
      description:
        "The report analyzes market trends, providing insights for strategic decisions.",
      filesize: "1.4 Mb",
      close: false,
      taginfo: { isOpen: false, tagtext: "SUCCESS", tagcolor: "color" },
    },
    {
      description: "This is the text for a that will be displayed.",
      filesize: `0.4 Mb`,
      close: true,
      taginfo: { isOpen: true, tagtext: "loading", tagcolor: "blue" },
    },
    {
      description: "Signed compliance doc.",
      filesize: "0.34 Mb",
      close: true,
      taginfo: { isOpen: true, tagtext: "loading", tagcolor: "blue" },
    },
    {
      description: "Overview of updated user guidelines and features.",
      filesize: "0.9 Mb",
      close: false,
      taginfo: { isOpen: false, tagtext: "SUCCESS", tagcolor: "color" },
    },
    {
      description:
        "The final presentation deck is included. Encapsulates all project phases and results, serving as a comprehensive summary for stakeholders.",
      filesize: "2.4 Mb",
      close: true,
      taginfo: { isOpen: true, tagtext: "SUCCESS", tagcolor: "green" },
    },
    {
      description: "Final presentation deck summary.",
      filesize: "0.8 Mb",
      close: true,
      taginfo: { isOpen: true, tagtext: "SUCCESS", tagcolor: "green" },
    },
    {
      description: "Market trends analysis for decision-making.",
      filesize: "0.4 Mb",
      close: false,
      taginfo: { isOpen: false, tagtext: "SUCCESS", tagcolor: "color" },
    },
  ];
  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 px-20 py-[6rem] flex-wrap overflow-auto"
      >
        {data.map((item, index) => (
          <Card data={item} reference={ref} />
        ))}
      </div>
    </>
  );
}

export default Foreground;
