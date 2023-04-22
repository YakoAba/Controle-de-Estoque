import { Box } from "@chakra-ui/react";
import { PacmanLoader } from "react-spinners";

function PacMan(): JSX.Element {
  return (
    <Box
      marginTop="10vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <PacmanLoader color="blue" size={70} />
    </Box>
  );
}

export default PacMan;
