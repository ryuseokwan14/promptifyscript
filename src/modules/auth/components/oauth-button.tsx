import React from "react";

interface OAuthButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function OAuthButton({ onClick, disabled }: OAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-container-high/50 text-on-surface transition duration-200 active:scale-[0.99] group shadow-sm cursor-pointer disabled:opacity-75"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path
          d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
          fill="#EA4335"
        />
        <path
          d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"
          fill="#4285F4"
        />
        <path
          d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
          fill="#FBBC05"
        />
        <path
          d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
          fill="#34A853"
        />
      </svg>
      <span className="font-body-md text-body-md font-medium text-on-surface group-hover:text-primary transition">
        Continue with Google Workspace
      </span>
    </button>
  );
}
