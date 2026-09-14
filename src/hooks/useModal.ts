"use client";

import { useState, useCallback } from "react";

export function useModal<T extends Record<string, unknown>>() {
  const [activeModal, setActiveModal] = useState<keyof T | null>(null);
  const [params, setParams] = useState<T[keyof T] | null>(null);

  const openModal = useCallback(
    <K extends keyof T>(modalKey: K, modalParams?: T[K]) => {
      setActiveModal(modalKey);
      setParams(modalParams ?? null);
    },
    []
  );

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setParams(null);
  }, []);

  const isOpen = useCallback(
    (modalKey: keyof T) => {
      return activeModal === modalKey;
    },
    [activeModal]
  );

  return {
    activeModal,
    params,
    openModal,
    closeModal,
    isOpen,
  };
}
