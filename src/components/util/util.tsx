import { useEffect } from "react";

/**
 * Hook that takes ref and onClick function
 * Runs passed function when an onclick happens outside of the passed ref
 */
export function useOutsideRefClick(ref: React.MutableRefObject<HTMLInputElement | null>, onClickOutside: () => void) {
    useEffect(() => {
  
      function handleClickOutside(event: any) {
        // if current ref is set and does not contain the latest event (bound)
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      }
  
      // listen for mouse clicks
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }