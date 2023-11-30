import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Header } from "./Header";
import { find, map } from "lodash";
import { useProjectStore } from "@/store/project";
import { Loader } from "@/common/Loader";
import { STATUS, UPLOAD_CARDS } from "@/constants";
import { UploadModal } from "./UploadModal";
import { UploadTable } from "./UploadTable";

export const Upload = ({ id }) => {
  const { getProjectAction, getProjectStatus, projectData } = useProjectStore((s) => ({
    getProjectAction: s.getProjectAction,
    getProjectStatus: s.getProjectStatus,
    projectData: s.projectData,
  }));

  const [uploadType, setUploadType] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const Project = useMemo(() => find(projectData, (p) => p._id == id), [projectData]);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("userData"));
    if (!Project) {
      getProjectAction({ user: email });
    }
  }, [Project]);

  const handleModal = (type) => {
    onOpen();
    setUploadType(type);
  };

  return (
    <Loader loading={getProjectStatus === STATUS.FETCHING}>
      {Project && (
        <Box>
          <Header name={Project?.name} page="Upload" />
          <Box mt={10} px={3}>
            <Heading color={"purple.600"}>{Project?.name}</Heading>
            <SimpleGrid gap={16} columns={3} w={"95%"} m={"auto"} mt={5} py={10}>
              {map(UPLOAD_CARDS, (upload) => {
                return (
                  <Card
                    boxShadow={"lg"}
                    variant={"outline"}
                    p={4}
                    onClick={() => handleModal(upload.type)}
                    borderColor={"gray.300"}
                    borderWidth={"2px"}
                    cursor={"pointer"}
                    borderRadius={"xl"}
                  >
                    <Flex align={"center"} gap={4}>
                      <Img src={upload.url} boxSize={16} />
                      <Text fontSize={"larger"} w={"32"} fontWeight={"medium"}>
                        {upload.title}
                      </Text>
                    </Flex>
                  </Card>
                );
              })}
            </SimpleGrid>
            <Card variant={"solid"} bg={"#7E22CE"} p={4} px={7} mt={4}>
              <Flex align={"center"} justify={"space-between"}>
                <Text color={"white"} fontSize={"x-large"} fontWeight={"bold"}>
                  All files are processed! Your widget is ready to go!
                </Text>
                <Button>Try it out!</Button>
              </Flex>
            </Card>
            <UploadTable id={id} />
          </Box>
        </Box>
      )}
      {isOpen && <UploadModal isOpen={isOpen} onClose={onClose} projectId={id} type={uploadType} />}
    </Loader>
  );
};
