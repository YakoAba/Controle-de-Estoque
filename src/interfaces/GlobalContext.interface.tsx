import { UseDisclosureProps } from "@chakra-ui/react";
import { SectionInterface } from "./Section.interface";

export interface GlobalContextInterface {
  listaProdutos: any;
  listaProdutosIsLoading: boolean;
  disclosureMenu: UseDisclosureProps;
  disclosureModalProdCad: UseDisclosureProps;
  sections: SectionInterface[];
  mutate();
}
