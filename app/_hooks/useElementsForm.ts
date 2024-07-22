"use client";

import { useEffect, useRef } from "react";
import { ProductErrors } from "../_utils/types";

export default function useElementsForm(state: ProductErrors | undefined) {
  const productEl = useRef<HTMLInputElement>(null);
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const priceEl = useRef<HTMLInputElement>(null);
  const discountEl = useRef<HTMLInputElement>(null);
  const categoryEl = useRef<HTMLInputElement>(null);
  const statusEl = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (categoryEl.current && state?.category) {
      return categoryEl.current.focus();
    }
    if (productEl?.current && state?.product) {
      return productEl.current.focus();
    }

    if (descriptionEl.current && state?.description) {
      return descriptionEl.current.focus();
    }
    if (priceEl.current && state?.price) {
      return priceEl.current.focus();
    }
    if (discountEl.current && state?.discount) {
      return discountEl.current.focus();
    }
    if (statusEl.current && state?.status) {
      setTimeout(() => {
        return statusEl.current?.focus();
      }, 0);
    }
  }, [state, productEl, descriptionEl, priceEl, statusEl, categoryEl]);

  return {
    productEl,
    descriptionEl,
    priceEl,
    statusEl,
    categoryEl,
    discountEl,
  };
}
