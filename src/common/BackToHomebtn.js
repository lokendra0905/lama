import { Button, Card } from "@chakra-ui/react";
import React from "react";
import { FaHome } from "react-icons/fa";

export const BackToHomebtn = () => {
  return (
    <Button
      leftIcon={<FaHome />}
      borderRadius={"2xl"}
      p={2}
      py={1}
      borderColor={"gray.500"}
      borderWidth={1}
      bg={"none"}
      boxShadow={'lg'}
    >
      Back To Home
    </Button>
  );
};
