import React, { forwardRef, useImperativeHandle, useState } from "react";

const Loading = forwardRef(function LoadingComponent(_, ref) {
  const [isLoading, setIsLoading] = useState(false);

  // Expose functions to the parent
  useImperativeHandle(ref, () => ({
    handleIsLoading: (enabled: boolean) => {
      console.log("handleIsLoading called with:", enabled);
      setIsLoading(enabled);
    },
  }));

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;
