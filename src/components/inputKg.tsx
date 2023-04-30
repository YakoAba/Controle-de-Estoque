/* eslint-disable react/no-children-prop */
import {
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function InputKg({ value , onChange, id }) {

  return (
    <>
      <Stack>
        <Text mb={-2} mt={1}>
          DOC:
        </Text>
        <InputGroup>
          <InputLeftAddon children="CPF" />
          <NumberInput
            value={value}
            precision={2}
            step={0.1}
            w="100vw"
            name="peso"
            focusBorderColor="blue.200"
            id={id}
            onChange={onChange}
          >
            <NumberInputField
              _placeholder={{ color: "blue" }}
              borderColor="black"
              _hover={{ borderColor: "blue" }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Stack>
    </>
  );
}
