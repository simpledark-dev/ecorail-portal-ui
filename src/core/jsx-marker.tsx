import React from "react";
import { Marker, MarkerProps } from "react-leaflet";
import ReactDOM from "react-dom";
import L from "leaflet";

interface Props extends MarkerProps {
  iconOptions?: L.DivIconOptions;
}

export const JSXMarker = React.forwardRef<L.Marker, Props>(
  ({ children, iconOptions, ...rest }, refInParent) => {
    const [ref, setRef] = React.useState<L.Marker | null>(null);

    const node = React.useMemo(
      () => (ref ? ReactDOM.createPortal(children, ref.getElement()!) : null),
      [ref, children],
    );

    return (
      <>
        {React.useMemo(
          () => (
            <Marker
              {...rest}
              ref={(r) => {
                setRef(r as L.Marker);
                if (refInParent) {
                  // @ts-expect-error forwardRef ts defs are tricky
                  refInParent.current = r;
                }
              }}
              icon={L.divIcon(iconOptions)}
            />
          ),
          [],
        )}
        {ref && node}
      </>
    );
  },
);
