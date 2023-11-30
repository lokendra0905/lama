import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
  Heading,
  Img,
  Stack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { SettingsIcon } from "@chakra-ui/icons";

const SidebarContent = ({ onClose, SidebarLinks, projectId, ...rest }) => {
  return (
    <Box bg={"#F3E8FF"} w={{ base: "full", md: "300px" }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href={"/"}>
          <Flex align={"center"} gap={4}>
            <Img src={"/assets/logo.png"} width={"50px"} height={"50px"} />
            <Heading color={"purple.500"} fontFamily={"Plus Jakarta Sans"}>
              LAMA.
            </Heading>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack spacing={2} mt={5}>
        {SidebarLinks.map((link, index) => (
          <NavItem key={link.name} index={index} route={link.route}>
            {link.name}
          </NavItem>
        ))}
      </Stack>
      <Box pos={"absolute"} bottom={3}>
        <Divider mt={5} borderColor={"gray.400"} mb={3} borderWidth={"1px"} />
        <NavItem route={`/upload/${projectId}/settings`} icon={SettingsIcon} mb="0">
          {"Settings"}
        </NavItem>
      </Box>
    </Box>
  );
};

const NavItem = ({ route, index, icon, children, ...rest }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      _activeLink={{
        bg: "purple.600",
        color: "white",
      }}
      w={"300px"}
      onClick={() => router.push(`${route}`)}
    >
      <Flex
        align="center"
        px="4"
        py={2}
        mx="4"
        borderRadius={"50px"}
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.600",
          color: "white",
        }}
        fontWeight={"bold"}
        bg={route == pathname ? "purple.600" : "none"}
        color={route == pathname ? "white" : "black"}
        {...rest}
        _selected={{
          bg: "purple.600",
          color: "white",
        }}
        gap={3}
        _checked={{ bg: "purple.600", color: "white" }}
      >
        {icon ? (
          <Icon
            as={icon}
            rounded
            borderRadius={"50%"}
            h={"30px"}
            w={"30px"}
            p="5px"
            bg={route == pathname ? "black" : "gray.300"}
            color={route == pathname ? "white" : "black"}
            _groupHover={{ bg: "black", color: "white" }}
          />
        ) : (
          <Flex
            variant={"outline"}
            borderRadius={"50%"}
            bg={route == pathname ? "black" : "gray.300"}
            color={route == pathname ? "white" : "black"}
            _groupHover={{ bg: "black", color: "white" }}
            h={"30px"}
            w={"30px"}
            justify={"center"}
            align={"center"}
          >
            {index + 1}
          </Flex>
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={"#F3E8FF"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.700"}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Flex align={"center"} gap={4}>
        <Img src={"/assets/logo.png"} width={"50px"} height={"50px"} />
        <Heading color={"purple.500"} fontFamily={"Plus Jakarta Sans"}>
          LAMA.
        </Heading>
      </Flex>
    </Flex>
  );
};

export const Sidebar = ({ children, projectId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SidebarLinks = [
    { name: "Projects", route: `/upload/${projectId}` },
    { name: "Widget Configurations", route: `/upload/${projectId}/widget-configuration` },
  ];

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        SidebarLinks={SidebarLinks}
        projectId={projectId}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} SidebarLinks={SidebarLinks} projectId={projectId} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: "300px" }} p="4">
        {children}
      </Box>
    </Box>
  );
};
