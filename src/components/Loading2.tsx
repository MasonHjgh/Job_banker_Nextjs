"use client";
import React from "react";
import { useLoadingStore } from "providers/Store";

export default function Loading(){
  const loadingStoreProvider = useLoadingStore();

  if (!loadingStoreProvider.isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};




