// Importa UseDisclosureProps da biblioteca "@chakra-ui/react"
import { UseDisclosureProps } from "@chakra-ui/react";
// Importa SectionInterface do arquivo "./Section.interface"
import { SectionInterface } from "./Section.interface";

// Define a interface GlobalContextInterface
export interface GlobalContextInterface {
  // Propriedade disclosureMenu do tipo UseDisclosureProps, usada para controle de visibilidade de menus
  disclosureMenu: UseDisclosureProps;
  // Propriedade disclosureModalProdCad do tipo UseDisclosureProps, usada para controle de visibilidade de modais de cadastro de produtos
  disclosureModalProdCad: UseDisclosureProps;
  // Propriedade disclosureModalProdIngrediente do tipo UseDisclosureProps, usada para controle de visibilidade de modais de ingredientes de produtos
  disclosureModalProdIngrediente: UseDisclosureProps;
  // Propriedade sections do tipo array de SectionInterface, contendo informações sobre seções
  sections: SectionInterface[];
}
