import React from "react";

export default function MarginSpace() {
  const divRef = React.useRef();
  React.useEffect(() => {
    // Change margin space height based on client view
    function handleResize() {
      if (divRef.current) {
        const allHeight =
          document.body.scrollHeight - divRef.current.offsetHeight;
        if (allHeight < window.innerHeight) {
          const mHeight = window.innerHeight - document.body.scrollHeight;
          // disable forever loop
          if (mHeight > 3 || mHeight < 0) {
            divRef.current.style.height =
              window.innerHeight - allHeight - 1 + "px";
          }
        } else {
          divRef.current.style.height = "0px";
        }
      }
    }
    handleResize();

    // Detect document body change
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(document.body);

    // Add event listener once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <div ref={divRef} />;
}
