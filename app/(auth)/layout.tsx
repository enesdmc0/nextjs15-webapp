import Image from "next/image";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-full ">
      <div className="hidden md:flex flex-1 relative">
        <Image
          alt="Auth Image"
          className="aspect-auto"
          src="https://images.pexels.com/photos/12129379/pexels-photo-12129379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          fill
        />
      </div>
      <div className="flex-1 items-center justify-center border">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
