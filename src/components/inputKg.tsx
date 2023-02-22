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
import { useState } from "react";

export default function InputKg() {
  const [value, setValue] = useState("0");

  return (
    <>
      <Stack>
        <Text>Peso:</Text>
        <InputGroup>
          <InputLeftAddon children="kg" />
          <NumberInput
            onChange={(valueString) => setValue(valueString)}
            value={value}
            precision={2}
            step={0.1}
            w="100vw"
            name="peso"
            id="peso"
          >
            <NumberInputField />
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
