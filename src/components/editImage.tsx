import { Flex, HStack, Image, Input, Text } from "@chakra-ui/react";

const InputImage = ({ value, onChance, id }) => {
  return (
    <Flex flexDirection="column" alignItems="start">
      <Text mb={-2} mt={1}>
        Foto:
      </Text>
      <HStack w={"100%"}>
        {value ? (
          <Image
            width="41"
            height="33"
            objectFit="fill"
            src={value}
            alt="LOGO"
          />
        ) : null}
        <Input
          value={value}
          onChange={onChance}
          placeholder="Url da imagem"
          _placeholder={{ color: "black" }}
          borderColor="black"
          focusBorderColor="red.200"
          _hover={{ borderColor: "red" }}
          mt="2"
          name="img"
          id={id}
        />
      </HStack>
    </Flex>
  );
};

export default InputImage;
