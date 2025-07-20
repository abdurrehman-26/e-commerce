import React from "react";

type LoaderProps = {
  message?: string;
};

export default function DotLoader({ message = "Loading..." }: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-8 w-full`}
    >
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce-dot delay-0" />
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce-dot delay-150" />
        <span className="w-3 h-3 bg-primary rounded-full animate-bounce-dot delay-300" />
      </div>
      <p className="text-sm font-semibold text-gray-600">{message}</p>
    </div>
  );
}
