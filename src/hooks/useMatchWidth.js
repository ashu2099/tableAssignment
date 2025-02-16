import { useState, useEffect } from "react";

function useMatchWidth(targetRef) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      if (targetRef.current) {
        setWidth(targetRef.current.offsetWidth); // Or clientWidth if needed
      }
    }

    // Initial update
    updateWidth();

    // Update on resize
    window.addEventListener("resize", updateWidth);

    // MutationObserver for dynamic content changes in target element
    const mutationObserver = new MutationObserver(updateWidth);
    if (targetRef.current) {
      mutationObserver.observe(targetRef.current, {
        attributes: true, // Observe attribute changes
      });
    }

    return () => {
      window.removeEventListener("resize", updateWidth);

      if (mutationObserver && targetRef.current) {
        mutationObserver.unobserve(targetRef.current);
      }
    };
  }, [targetRef]); // Re-run effect if targetRef changes

  return width; // Return the ref and the width
}

export default useMatchWidth;

// Usage:
// function MyComponent() {
//   const targetRef = useRef(null);
//   const [ref, width] = useMatchWidth(targetRef);
//   return (
//     <div>
//       <div ref={targetRef}>Target</div>
//       <div ref={ref} style={{ width }}>Match</div>
//     </div>
//   );
// }
