import { BadgeDollarSign } from "lucide-react";
import type { ReactNode } from "react";
import Style from "./Wanted.module.css";
export const Wanted = ({ children }: { children: ReactNode }) => {
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
      <div className={Style.questComponent}>
        <div className={Style.layout}>
          <h2 className={Style.wanted}>WANTED</h2>
          {children}
        </div>
        <div className={Style.footer}>
          <p className={Style.reward}> REWARD : 24 000 {<BadgeDollarSign />}</p>
          <h2 className={Style.dead}> DEAD OR ALIVE</h2>
        </div>
      </div>
    </>
  );
};
export default Wanted;
