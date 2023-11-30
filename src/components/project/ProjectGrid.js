import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Card, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { map } from "lodash";
import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

export const ProjectGrid = ({ projects, handleModal }) => {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  return (
    <Box mt={4}>
      <Flex align={"center"} justify={"space-between"}>
        <Heading fontSize={"xxx-large"} color={"purple.600"}>
          Projects
        </Heading>
        <Button
          leftIcon={<AddIcon borderRadius={"50"} bg={"white"} p={"3px"} color={"#211935"} />}
          bg={"#211935"}
          color={"white"}
          py={7}
          fontSize={"x-large"}
          _hover={{ bg: "#211935", color: "white" }}
          onClick={handleModal}
        >
          Create New Project
        </Button>
      </Flex>

      <SimpleGrid columns={3} mt={10} gap={10}>
        {map(projects, (project) => {
          console.log(project);

          return (
            <Card
              variant={"outline"}
              p={5}
              cursor={"pointer"}
              borderRadius={"3xl"}
              borderColor={"gray.400"}
              boxShadow={"lg"}
            >
              <Link href={`/upload/${encodeURIComponent(project._id)}`}>
                <Flex gap={4} align={"center"}>
                  <Avatar borderRadius={"lg"} name={project.name} size={"xl"} />
                  <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"} color={"purple.600"}>
                      {project.name}
                    </Text>
                    <Text fontWeight={"bold"} color={"gray.700"}>
                      {(project.count || 0) + " Episodes"}
                    </Text>
                    <Text color={"gray.500"} mt={3}>
                      {"Last edit " + dayjs(project.updatedAt).fromNow()}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
