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

type InputKgProps = {
  value : number;
  onChange: any,
  id:string;
}

export default function InputKg({ value , onChange, id }) {

  return (
    <>
      <Stack>
        <Text mb={-1} mt={2}>
          Peso:
        </Text>
        <InputGroup>
          <InputLeftAddon children="kg" />
          <NumberInput
            value={value}
            precision={2}
            step={0.1}
            w="100vw"
            name="peso"
            focusBorderColor="red.200"
            id={id}
            onChange={onChange}
          >
            <NumberInputField
              _placeholder={{ color: "red" }}
              borderColor="black"
              _hover={{ borderColor: "red" }}
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
