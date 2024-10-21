import { motion } from "framer-motion";
import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { ImCloudDownload } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";

function Card({ data, reference }) {
  const demoAlert = () => {
    alert("This is a demo!");
  };
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.2 }}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      className="relative h-[330px] w-64 rounded-[40px] bg-slate-100 py-10 px-8 overflow-hidden cursor-cell"
    >
      <FaFileAlt />
      <p className="text-[15px] font-thin opacity-90 leading-tight mt-5">
        {data.description}
      </p>
      <div className="footer absolute bottom-0 left-0 w-full cursor-pointer">
        <div className="flex items-center justify-between px-8 py-3 mb-3">
          <h4
            className={`${
              data.taginfo.tagcolor === "blue"
                ? "text-blue-600"
                : data.taginfo.tagcolor === "green"
                ? "text-green-600"
                : "text-black"
            } font-semibold`}
          >
            {data.filesize}
          </h4>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center bg-black/70"
            onClick={demoAlert}
          >
            {data.close ? (
              <IoClose color="white" />
            ) : (
              <MdOutlineFileDownload color="white" />
            )}
          </span>
        </div>
        {data.taginfo.isOpen ? (
          <div
            className={`tag w-full py-3 ${
              data.taginfo.tagcolor === "blue" ? "bg-blue-600" : "bg-green-600"
            } flex items-center justify-center`}
          >
            <h2
              className="text-white text-[16px] font-semibold tracking-[0.8px]"
              onClick={demoAlert}
            >
              {data.taginfo.tagtext === "loading" ? (
                <ImCloudDownload size={"1.5em"} color="white" />
              ) : (
                data.taginfo.tagtext
              )}
            </h2>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default Card;
