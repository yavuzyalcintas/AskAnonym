import EmojiPicker from "emoji-picker-react";
import React, { FC } from "react";

interface EmojiSelectProps {
  handleChange: (event: any) => void;
}

const EmojiSelector = ({ handleChange }: EmojiSelectProps) => {
  return (
    <div className="absolute z-50">
      <EmojiPicker onEmojiClick={handleChange} />
    </div>
  );
};

export default EmojiSelector;
