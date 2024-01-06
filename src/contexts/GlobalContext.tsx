// Importa a função useDisclosure do pacote "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react";
// Importa createContext, useContext e useState do pacote "react"
import { createContext, useContext, useState } from "react";
// Importa a interface GlobalContextInterface do arquivo "../interfaces/GlobalContext.interface"
import { GlobalContextInterface } from "../interfaces/GlobalContext.interface";
// Importa a constante Sections do arquivo "../config/constants"
import { Sections } from "../config/constants";

// Cria um contexto GlobalContext com o tipo GlobalContextInterface
const GlobalContext = createContext<GlobalContextInterface>(
  {} as GlobalContextInterface
);

// Exporta um componente Provider que recebe children como parâmetro
export const Provider = ({ children }) => {
  // Cria três instâncias de useDisclosure para controle de visibilidade de componentes
  const disclosureMenu = useDisclosure();
  const disclosureModalProdCad = useDisclosure();
  const disclosureModalProdIngrediente = useDisclosure();

  // Inicializa um estado sections com o valor de Sections
  const [sections] = useState(Sections);

  // Cria um objeto value contendo as instâncias de useDisclosure e o estado sections
  const value = {
    disclosureMenu,
    disclosureModalProdCad,
    disclosureModalProdIngrediente,
    sections,
  };

  // Retorna um provedor de contexto GlobalContext.Provider com o valor value e os elementos filhos (children)
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

// Exporta um hook personalizado useGlobalContext que retorna o contexto GlobalContext
export const useGlobalContext = () => useContext(GlobalContext);
