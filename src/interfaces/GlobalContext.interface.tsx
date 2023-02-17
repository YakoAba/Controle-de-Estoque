import { UseDisclosureProps } from "@chakra-ui/react";
import { SectionInterface } from "./Section.interface";

export interface GlobalContextInterface {
  disclosureMenu: UseDisclosureProps;
  disclosureModalProdCad: UseDisclosureProps;
  sections: SectionInterface[];
}
