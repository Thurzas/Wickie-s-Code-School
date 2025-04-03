import type { ReactNode } from "react";
import Style from "./Wanted.module.css";
export const SimpleDamagedPaper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <svg width="0" height="0">
        <title id="filterTitle">Effet de papier froissé avec ombre</title>
        <filter id="crumpledPaper">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005"
            numOctaves="8"
          />
          <feComponentTransfer in="turbulence" result="grayNoise">
            <feFuncR type="linear" slope="0.3" intercept="0.4" />
          </feComponentTransfer>
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
      <div className={Style.paperComponent}>
        <div className={Style.paperLayout}>{children}</div>
      </div>
    </>
  );
};
export default SimpleDamagedPaper;
