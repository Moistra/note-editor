import { useState, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { createWrapperToBody } from "@utils/";

interface PortalProps {
  children: React.ReactNode;
  wrapperId?: string;
}

export function Portal({
  children,
  wrapperId = "portal-wrapper",
}: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<null | HTMLElement>(
    null
  );

  useLayoutEffect(() => {
    let wrapper = document.getElementById(wrapperId);
    let isWrapperCreated = false;

    if (!wrapper) {
      isWrapperCreated = true;
      wrapper = createWrapperToBody(wrapperId);
      setWrapperElement(wrapper);
    }

    return () => {
      if (isWrapperCreated && wrapper?.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return <>{createPortal(children, wrapperElement)}</>;
}
