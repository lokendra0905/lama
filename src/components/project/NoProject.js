import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

export const NoProject = ({ handleModal }) => {
  return (
    <Box textAlign={"center"} mt={5}>
      <Heading fontSize={"xxx-large"} color={"purple.600"}>
        Create a New Project
      </Heading>
      <Img m={"auto"} w={"30%"} src="/assets/No-Projects.png" mt={10} />
      <Text
        w={"90%"}
        m={"auto"}
        mt={10}
        fontSize={"lg"}
        fontWeight={"500"}
        lineHeight={"30px"}
        color={"gray.400"}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      </Text>
      <Button
        mt={4}
        leftIcon={
          <AddIcon
            borderRadius={"50"}
            bg={"white"}
            p={"3px"}
            color={"#211935"}
            w={"25px"}
            h={"25px"}
          />
        }
        bg={"#211935"}
        color={"white"}
        w={"30%"}
        py={7}
        fontSize={"x-large"}
        _hover={{ bg: "#211935", color: "white" }}
        onClick={handleModal}
      >
        Create New Project
      </Button>
    </Box>
  );
};
