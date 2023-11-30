import { Box, Button, Card, Flex, Heading, Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Header } from "./Header";
import { useSearchParams } from "next/navigation";
import { find } from "lodash";
import { useUploadStore } from "@/store/uploads";
import { useProjectStore } from "@/store/project";
import { Loader } from "@/common/Loader";
import { STATUS } from "@/constants";
import { FaPencilAlt } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";

export const EditUpload = ({ id }) => {
  const { handleSubmit, control, setValue } = useForm();
  const searchParams = useSearchParams();
  const uploadId = searchParams.get("id");
  const [editMode, setEditMode] = useState(false);

  const {
    getAllUploadAction,
    getAllUploadStatus,
    uploadData,
    resetUploadStatus,
    updateUploadAction,
    updateUploadStatus,
  } = useUploadStore((s) => ({
    getAllUploadAction: s.getAllUploadAction,
    getAllUploadStatus: s.getAllUploadStatus,
    uploadData: s.uploadData,
    resetUploadStatus: s.resetUploadStatus,
    updateUploadAction: s.updateUploadAction,
    updateUploadStatus: s.updateUploadStatus,
  }));

  const { getProjectAction, getProjectStatus, projectData } = useProjectStore((s) => ({
    getProjectAction: s.getProjectAction,
    getProjectStatus: s.getProjectStatus,
    projectData: s.projectData,
  }));

  const Project = useMemo(() => find(projectData, (p) => p._id == id), [projectData]);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem("userData"));
    if (!projectData) {
      getProjectAction({ user: email });
    }
  }, [projectData]);

  useEffect(() => {
    if (!uploadData) {
      getAllUploadAction({ projectId: id });
    }
  }, [uploadData, getAllUploadAction]);

  const upload = useMemo(() => find(uploadData, (up) => up._id == uploadId), [uploadData]);

  const handleEditMode = () => {
    setEditMode(() => !editMode);
    setValue("desc", upload.desc);
  };

  const onSubmit = ({ desc }) => {
    updateUploadAction({ id: upload?._id, desc });
  };

  useEffect(() => {
    if (updateUploadStatus === STATUS.SUCCESS) {
      resetUploadStatus();
      setEditMode(false);
    }
  }, [updateUploadStatus]);

  return (
    <Loader loading={getProjectStatus == STATUS.FETCHING || getAllUploadStatus == STATUS.FETCHING}>
      <Box>
        <Header name={Project?.name} page={upload?.name} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box px={3} mt={14}>
            <Flex color={"purple.600"} justify={"space-between"}>
              <Heading>{"Edit " + upload?.name}</Heading>
              {editMode && (
                <Flex gap={4} align={"center"}>
                  <Button colorScheme={"red"} variant={"outline"} onClick={handleEditMode}>
                    Discard
                  </Button>
                  <Button
                    bg={"#211935"}
                    color={"white"}
                    _hover={{ bg: "#211935", color: "white" }}
                    type="submit"
                    isLoading={updateUploadStatus === STATUS.FETCHING}
                    loadingText="Saving"
                  >
                    Save & Edit
                  </Button>
                </Flex>
              )}
            </Flex>

            <Card
              variant={"outline"}
              borderColor={"purple.600"}
              p={3}
              mt={4}
              borderWidth={"2px"}
              borderRadius={"2xl"}
            >
              <Button
                leftIcon={<FaPencilAlt />}
                size={"sm"}
                w={"28"}
                bg={"#3C3C3C"}
                borderRadius={"113px"}
                px={2}
                color={"white"}
                _hover={{ bg: "#3C3C3C", color: "white" }}
                onClick={handleEditMode}
              >
                Edit Mode
              </Button>
              <Controller
                control={control}
                name="desc"
                defaultValue={upload?.desc}
                render={({ field }) => (
                  <Textarea
                    isReadOnly={!editMode}
                    mt={6}
                    {...field}
                    w={"full"}
                    border={"none"}
                    height={"300px"}
                    _active={{ border: "none" }}
                  />
                )}
              />
            </Card>
          </Box>
        </form>
      </Box>
    </Loader>
  );
};
