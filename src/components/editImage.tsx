import { Box, Flex, HStack, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const InputImage = () => {
  const [image, setImage] = useState("");
  return (
    <Flex flexDirection="column" alignItems="start">
      <Text  >
        Foto:
      </Text>
     <HStack w={"100%"}>
        {image ? (
          <Image
            width="41"
            height="33"
            objectFit="fill"
            src={image}
            alt="LOGO"
          />
        ) : null}
        <Input
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="Url da imagem"
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="red"
          _hover={{ borderColor: "red" }}
          mt="2"
          name="img"
          id="img"
        />
     </HStack>
    </Flex>
  );
};

export default InputImage;
