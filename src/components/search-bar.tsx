import { Search } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

interface SearchBarProps {
  action: () => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

function SearchBar({ action, onChange, value }: SearchBarProps) {
  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      await action();
    }
  };

  const darkMode = useSelector((state: RootState) => state.mode.darkMode);

  return (
    <>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search For Tracks"
          className="w-full py-6 px-8 bg-transparent rounded-[10rem] border-2 border-primary-black dark:border-zinc-50 text-primary-black dark:text-zinc-50 outline-none shadow-lg"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="absolute inset-y-0 right-4 flex items-center pr-3"
          onClick={action}
        >
          <Search color={darkMode ? "#FAFAFA" : "#0E0F09"} size={24} />
        </button>
      </div>
    </>
  );
}

export default SearchBar;
