import { Box, HStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

export const Loader = ({ height = 200, loaderSize = "lg", loading = false, children }) => {
  return (
    <Box>
      {loading ? (
        <HStack minHeight={height} justify="center" align={"center"}>
          <Spinner
            color="purple.600"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            size="xl"
          />
        </HStack>
      ) : (
        children
      )}
    </Box>
  );
};
