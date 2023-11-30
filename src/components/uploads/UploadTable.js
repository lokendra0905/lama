import { ConfirmAlert } from "@/common/ConfirmAlert";
import { Loader } from "@/common/Loader";
import { STATUS } from "@/constants";
import { useUploadStore } from "@/store/uploads";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { map } from "lodash";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

export const UploadTable = ({ id }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState();
  const router = useRouter();
  const {
    getAllUploadAction,
    getAllUploadStatus,
    uploadData,
    deleteUploadAction,
    deleteUploadStatus,
    resetUploadStatus,
  } = useUploadStore((s) => ({
    getAllUploadAction: s.getAllUploadAction,
    getAllUploadStatus: s.getAllUploadStatus,
    uploadData: s.uploadData,
    deleteUploadAction: s.deleteUploadAction,
    deleteUploadStatus: s.deleteUploadStatus,
    resetUploadStatus: s.resetUploadStatus,
  }));

  useEffect(() => {
    getAllUploadAction({ projectId: id });
  }, [getAllUploadAction]);

  const getPlatfom = (platform) => {
    if (platform == "YOUTUBE") {
      return "/assets/youtube.png";
    } else if (platform == "SPOTIFY") {
      return "/assets/spotify.png";
    } else if (platform == "RSS") {
      return "/assets/rss.png";
    }
  };

  const handleDelete = () => {
    deleteUploadAction({
      id: showDeleteAlert,
    });
  };

  const toggleDeleteAlert = (id = null) => {
    setShowDeleteAlert(id);
  };

  const handleEdit = (editId) => {
    router.push(`/upload/${id}/edit?id=${editId}`);
  };

  useEffect(() => {
    if (deleteUploadStatus == STATUS.SUCCESS) {
      setShowDeleteAlert(null);
      resetUploadStatus();
    }
  }, [deleteUploadStatus, resetUploadStatus]);

  return (
    <Loader loading={getAllUploadStatus == STATUS.FETCHING}>
      {uploadData?.length ? (
        <Box
          borderColor={"gray.300"}
          borderWidth={"1px"}
          borderStyle={"solid"}
          mt={10}
          borderRadius={"lg"}
        >
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Upload Date & Time</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {map(uploadData, (upload) => {
                  return (
                    <Tr>
                      <Td>
                        <HStack>
                          <Avatar src={getPlatfom(upload.platform)} size={"sm"} />
                          <Text>{upload.name}</Text>
                        </HStack>
                      </Td>
                      <Td>{dayjs(upload.createdAt).format("D MMM, YY | h:mm A")}</Td>
                      <Td>{upload.status}</Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<BiDotsVerticalRounded />}
                            variant="outline"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<EditIcon />}
                              color="purple.600"
                              _hover={{ bg: "purple.600", color: "white" }}
                              onClick={() => handleEdit(upload._id)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={<DeleteIcon />}
                              color="red.600"
                              _hover={{ bg: "red", color: "white" }}
                              onClick={() => toggleDeleteAlert(upload._id)}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Card
          variant={"outline"}
          borderRadius={"lg"}
          borderWidth={"3px"}
          borderColor={"gray.400"}
          borderStyle={"dashed"}
          mt={10}
          p={3}
        >
          <Box m={"auto"}>
            <Img src="/assets/upload.png" />
          </Box>
          <Box m={"auto"}>
            <Text fontSize={"larger"} color={"gray.600"}>
              Select a file or drag and drop here (Podcast Media or Transcription Text)
            </Text>
            <Flex justify={"center"} m={"auto"} mt={4}>
              <Button
                p={3}
                colorScheme={"purple"}
                variant={"outline"}
                borderRadius={"20px"}
                w={"32"}
                _hover={{ bg: "purple.600", color: "white" }}
              >
                Upload File
              </Button>
            </Flex>
          </Box>
        </Card>
      )}
      {showDeleteAlert && (
        <ConfirmAlert
          isOpen={true}
          onClose={() => toggleDeleteAlert(null)}
          message="Are you sure you want to delete this Upload?"
          heading="Delete Upload"
          onConfirm={handleDelete}
          loading={deleteUploadStatus === STATUS.FETCHING}
        />
      )}
    </Loader>
  );
};
