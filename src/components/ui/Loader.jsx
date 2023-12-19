import { useState, useEffect } from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <img width={24} height={24} className="" src="/assets/icons/loader.svg" alt="Loader" />
    </div>
  );
};

export default Loader;
