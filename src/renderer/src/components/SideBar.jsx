/* eslint-disable prettier/prettier */
import { PiNotePencilBold } from "react-icons/pi";
import { IoMdImages } from "react-icons/io";
import { IoBookmarksOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";

export default function SideBar() {
  return (
    <div className="h-full min-h-screen w-45 bg-gray-800 text-white flex flex-col fixed left-0 top-0">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 text-center">
        LIF
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-6 flex flex-col items-center">
          <li className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <PiNotePencilBold size={20} />
          </li>
          <li className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <IoMdImages size={20} />
          </li>
          <li className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <IoBookmarksOutline size={20} />
          </li>
          <li className="p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
            <MdHistory size={20} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
