/* eslint-disable react/no-children-prop */
import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useState } from "react";
import InputImage from "../editImage";
import InputKg from "../inputKg";

const Tab1 = () => {
  const [image, setImage] = useState("");
  const [bruto, setBruto] = useState("");
  const [liquido, setLiquido] = useState("");
  const [taxa, setTaxa] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;

    console.log(id + "  :  " + value);
    const updateState = {
      bruto: setBruto,
      img: setImage,
      Liquido: setLiquido,
      taxa: setTaxa,
    };

    const setState = updateState[id];
    setState(value);
  };
  return (
    <Stack>
      <InputImage />
      <InputKg />
    </Stack>
  );
};

export default Tab1;
