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
  import PropTypes from "prop-types";
  
  function InputNumero({ value, onChange, id }) {
    return (
      <>
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
      </>
    );
  }
  
  function SliderTrackInput({ value, onChange, id }) {
    return (
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
    );
  }
  
  export default function NumeroInput({ value, onChange, id }) {
    return (
      <InputGroup>
        <InputNumero value={value} onChange={onChange} id={id} />
        <SliderTrackInput value={value} onChange={onChange} id={id} />
      </InputGroup>
    );
  }
  
  NumeroInput.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };
  
  NumeroInput.defaultProps = {
    value: 0,
    onChange: () => {},
    id: "",
  };
  