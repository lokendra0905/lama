import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Header } from "../layouts/Header";

export const MainLayout = (props) => {
  return (
    <Box bg="white">
      <Box minH="100vh" pos={"relative"}>
        <Header />
        <Box pos="relative">{props.children}</Box>
      </Box>
    </Box>
  );
};
