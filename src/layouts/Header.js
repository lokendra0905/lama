import { IoMdSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { Flex, Image, IconButton, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      minH={"10vh"}
      bg={"whitesmoke"}
      px="30"
      py={"5"}
      borderBottom="1px solid"
      borderColor={"gray.200"}
      justify={"space-between"}
      align={"center"}
    >
      <Flex align={"center"} gap={4}>
        <Image src={"/assets/logo.png"} width={"50px"} height={"50px"} />
        <Heading color={"purple.500"} fontFamily={"Plus Jakarta Sans"}>
          LAMA.
        </Heading>
      </Flex>
      <Flex align={"center"} gap={10} px={5}>
        <IconButton
          icon={<IoMdSettings />}
          size={"xl"}
          isRound
          _hover={{ bg: "none" }}
          bg={"none"}
        />
        <IconButton
          icon={<IoMdNotifications />}
          size={"xl"}
          isRound
          _hover={{ bg: "none" }}
          bg={"none"}
        />
      </Flex>
    </Flex>
  );
};
