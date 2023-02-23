/* eslint-disable react/no-children-prop */
// /* eslint-disable react/no-children-prop */
// import {
//   Flex,
//   InputGroup,
//   InputLeftAddon,
//   NumberDecrementStepper,
//   NumberIncrementStepper,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   Slider,
//   SliderFilledTrack,
//   SliderThumb,
//   SliderTrack,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import { useState } from "react";

import {
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

export default function SliderInput({ value, onChange, id }) {
  return (
    <InputGroup>
      <InputLeftAddon children="R$" />
      <NumberInput
        step={0.01}
        precision={2}
        maxW="130px"
        mr="2rem"
        value={value}
        onChange={onChange}
        id={id}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value[id]}
        onChange={onChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" />
      </Slider>
    </InputGroup>
  );
}
