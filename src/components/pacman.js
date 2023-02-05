import { Box } from "@chakra-ui/react";
import { PacmanLoader } from "react-spinners";

const PacMan = () => {
  return (
    <Box marginTop="3" display="flex" justifyContent="center">
      <PacmanLoader color="red" size={70} />
    </Box>
  );
};

export default PacMan;