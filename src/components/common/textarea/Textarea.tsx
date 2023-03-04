"use client";

import Button from "../button/Button";
import Avatar from "../../global/Avatar";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useSession } from "@supabase/auth-helpers-react";

interface TextareaProps {
  placeholder: string;
  value: string;
  maxLength: number;
  isLoading?: boolean;
  setValue: (value: string) => void;
  onSend: () => void;
}

export default function Textarea({
  placeholder,
  value,
  isLoading,
  maxLength,
  setValue,
  onSend,
}: TextareaProps) {
  const session = useSession();

  return (
    <div className="flex items-start space-x-4 pt-6">
      {session && (
        <div className="flex-shrink-0">
          <Avatar
            username={session.user.user_metadata.username}
            url={session.user.user_metadata.avatar_url}
            size={32}
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-purple-700 focus-within:ring-1 focus-within:ring-purple-700">
          <label htmlFor="comment" className="sr-only">
            {placeholder}
          </label>
          <textarea
            rows={2}
            className="block w-full resize-none border-0 focus:ring-0 sm:text-sm"
            placeholder={placeholder}
            value={value}
            maxLength={maxLength}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex justify-end inset-x-0 bottom-0 py-2 pl-3">
          <div className="flex-shrink-0">
            <Button
              startIcon={<PaperAirplaneIcon className="w-5 h-5" />}
              size="small"
              isLoading={isLoading}
              onClick={onSend}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
