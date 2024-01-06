/* eslint-disable react/no-children-prop */
import { Input, Select, Stack, Text } from "@chakra-ui/react";
import { useProfissionalContext } from "./context";
import { useServicoContext } from "../servicos/context";
import { Module } from "../../interfaces/Pdv.interface";

const Tab1 = () => {
  // Obtém o estado e a função de atualização do contexto do profissional
  const { item, setItem } = useProfissionalContext();

  // Obtém os dados e o estado de carregamento do contexto de serviços
  const { listaServicos, listaServicosIsLoading } = useServicoContext();

  return (
    <>
      {/* Seção do Select para escolher um serviço */}
      <Stack>
        {/* Componente Select para escolher um serviço */}
        <Select
          _placeholder={{ color: "red.200" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red.200" }}
          value={item.servico} // Valor selecionado
          onChange={(e) => setItem({ ...item, servico: e.target.value })} // Atualiza o estado com o valor selecionado
        >
          {/* Opção padrão com valor 0 e mensagem de seleção */}
          <option value="0">Selecione um serviço</option>

          {/* Mapeia os serviços para criar as opções do Select */}
          {!listaServicosIsLoading && // Verifica se os serviços estão carregados
            listaServicos.json.length > 0 && // Verifica se há serviços disponíveis
            listaServicos.json.map((itemaux: Module.ServicosInterface, i) => (
              <option key={i} value={itemaux._id}>
                {itemaux.nome}
              </option>
            ))}
        </Select>
      </Stack>

      {/* Seção do Input para o nome */}
      <Stack>
        {/* Texto indicando a entrada do nome */}
        <Text mb={-2} mt={1}>
          Nome:
        </Text>

        {/* Input para inserir o nome */}
        <Input
          value={item.nome} // Valor do nome
          _placeholder={{ color: "red.200" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red.200" }}
          onChange={(e) => setItem({ ...item, nome: e.target.value })} // Atualiza o estado com o nome inserido
          id="nome"
        ></Input>
      </Stack>
    </>
  );
};

export default Tab1;
