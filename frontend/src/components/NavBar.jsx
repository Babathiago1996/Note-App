import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="p-4 mx-auto  max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-mono font-bold text-primary tracking-tight">
            Thinkboard
          </h1>
          <div className="flex gap-1 items-center">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
