import { UseDisclosureProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { PdvModule } from "./Pdv.interface";
import { SectionInterface } from "./Section.interface";


export interface GlobalContextInterface {
  disclosureMenu: UseDisclosureProps;
  sections: SectionInterface[];
  mutate();
}
