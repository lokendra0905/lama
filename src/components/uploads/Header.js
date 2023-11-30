import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  Img,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { GoTriangleDown } from "react-icons/go";
import { MdOutlineNotifications } from "react-icons/md";
import Link from "next/link";

export const Header = ({ name, page }) => {
  return (
    <Flex mt={2} justify={"space-between"} w={"100%"} align={"center"} px={3}>
      <Breadcrumb fontWeight={"medium"} fontSize={"x-large"} alignItems={"center"}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            <Icon boxSize={7} color={"purple.600"} as={MdOutlineHome} mb={1} />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {name && (
          <BreadcrumbItem color={"#999999"}>
            <BreadcrumbLink href="#">{name}</BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {page && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={"purple.600"} href="#">
              {page}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex gap={5} align={"center"}>
        <Flex align={"center"}>
          <Icon boxSize={10} as={GoTriangleDown} />
          <Text fontSize={"larger"} fontWeight={"medium"}>
            EN
          </Text>
        </Flex>
        <Img boxSize={"40px"} src="/assets/Britain_logo.png" />
        <Icon boxSize={9} as={MdOutlineNotifications} />
      </Flex>
    </Flex>
  );
};
