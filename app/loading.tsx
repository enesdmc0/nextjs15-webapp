import React from "react";

const Loading = () => {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-sm">Yükleniyor...</p>
      <div className="flex items-center">
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-black"></div>
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-black ml-3"></div>
        <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-black ml-3"></div>
      </div>
    </main>
  );
};

export default Loading;
