import React from "react";

function Background() {
  return (
    <>
      <div className="fixed z-[2] w-full h-screen">
        {/* <div className=" absolute top-[5%] w-full py-10 flex justify-center text-3xl font-semibold">
          Documents
        </div> */}
        <h1 className="absolute text-[13vw] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold leading-none opacity-60">
          Docs.
        </h1>
      </div>
    </>
  );
}

export default Background;
