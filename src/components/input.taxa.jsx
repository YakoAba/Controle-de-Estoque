import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SliderInput() {
  const [value, setValue] = useState(0);
  const handleChange = (value) => setValue(value);

  return (
    <Flex>
      <NumberInput
        step={0.01}
        precision={2}
        maxW="100px"
        mr="2rem"
        value={value}
        onChange={handleChange}
        w="100vw"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput >
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb  fontSize="sm" boxSize="32px" />
      </Slider>
    </Flex>
  );
}
