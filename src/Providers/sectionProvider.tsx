import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { ActiveTab } from "../types";

type SectionContext = {
  activeSection: ActiveTab;
  setActiveSection: Dispatch<SetStateAction<ActiveTab>>;
};

export const SectionContext = createContext({} as SectionContext);

export const SectionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeSection, setActiveSection] = useState<ActiveTab>("all");

  return (
    <SectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
