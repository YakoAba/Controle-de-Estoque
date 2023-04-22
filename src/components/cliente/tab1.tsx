/* eslint-disable react/no-children-prop */
import { Input, Stack, Text, Textarea } from "@chakra-ui/react";
import InputImage from "../editImage";
import InputKg from "../inputKg";
import { useClienteContext } from "./context";
import MaskedInput from "react-text-mask";

const Tab1 = () => {
  const { cliente, setCliente } = useClienteContext();

  const onPhoneChange = (e) => {
    const unmaskedValue = e.target.value.replace(/\D+/g, "");
    setCliente({ ...cliente, numero: unmaskedValue });
  };

  return (
    <Stack>
      <Stack>
        <Text mb={-2} mt={1}>
          NOME:
        </Text>
        <Input
          value={cliente.nome}
          _placeholder={{ color: "blue.200" }}
          borderColor="black"
          focusBorderColor="blue.200"
          _hover={{ borderColor: "blue.200" }}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
          id="nome"
        ></Input>
      </Stack>
      <Stack>
        <Text mb={-2} mt={1}>
          TELEFONE:
        </Text>
        <MaskedInput
          mask={(rawValue) => {
            return rawValue.length <= 10
              ? ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
              : ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
          }}
          guide={false}
          value={cliente.numero}
          onChange={onPhoneChange}
          render={(ref, props) => (
            <Input
              {...props}
              ref={ref}
              _placeholder={{ color: "blue.200" }}
              borderColor="black"
              focusBorderColor="blue.200"
              _hover={{ borderColor: "blue.200" }}
              id="numero"
            />
          )}
        />
      </Stack>
      <Stack>
        <Text mb={-2} mt={1}>
          MENSAGEM:
        </Text>
        <Textarea
          value={cliente.mensagem}
          onChange={(e) => setCliente({ ...cliente, mensagem: e.target.value })}
          id="mensagem"
          _placeholder={{ color: "blue.200" }}
          borderColor="black"
          focusBorderColor="blue.200"
          _hover={{ borderColor: "blue.200" }}
          height={150}
        />
      </Stack>
    </Stack>
  );
};

export default Tab1;
