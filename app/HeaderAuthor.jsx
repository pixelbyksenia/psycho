import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function HeaderAuthor() {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mb-6">
      <h2 className="text-lg text-purple-100 font-medium">Об авторе</h2>
      <button
        className="bg-black/40 hover:bg-black/60 p-3 rounded-full transition flex items-center justify-center"
        aria-label="YouTube"
      >
        <YouTubeIcon style={{ color: "white", fontSize: 28 }} />
      </button>
    </div>
  );
}
