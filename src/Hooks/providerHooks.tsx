import { useContext } from "react";
import { SectionContext } from "../Providers/sectionProvider";
import { DogsContext } from "../Providers/dogProvider";

export const useSection = () => useContext(SectionContext);
export const useDogs = () => useContext(DogsContext);
