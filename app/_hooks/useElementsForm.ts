import { useEffect, useRef } from "react";
import { ProductErrors } from "../_utils/types";

export default function useElementsForm(state: ProductErrors | undefined) {
  const productEl = useRef<HTMLInputElement>(null);
  const descriptionEl = useRef<HTMLTextAreaElement>(null);
  const priceEl = useRef<HTMLInputElement>(null);
  const statusEl = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (productEl?.current && state?.product) {
      return productEl.current.focus();
    }
    if (descriptionEl.current && state?.description) {
      return descriptionEl.current.focus();
    }
    if (priceEl.current && state?.price) {
      return priceEl.current.focus();
    }
    if (statusEl.current && state?.status) {
      console.log("yes");
      setTimeout(() => {
        return statusEl.current?.focus();
      }, 0);
    }
  }, [state, productEl, descriptionEl, priceEl, statusEl]);

  return { productEl, descriptionEl, priceEl, statusEl };
}
