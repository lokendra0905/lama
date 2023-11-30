import React, { useEffect } from "react";
import { Box, Button, Heading, Img, Text, useDisclosure } from "@chakra-ui/react";
import { BackToHomebtn } from "@/common/BackToHomebtn";
import { AddIcon } from "@chakra-ui/icons";
import { AddProjectModal } from "./AddProjectModal";
import { NoProject } from "./NoProject";
import { useProjectStore } from "@/store/project";
import { Loader } from "@/common/Loader";
import { STATUS } from "@/constants";
import { UserModal } from "./UserModal";
import { ProjectGrid } from "./ProjectGrid";

export const Project = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onOpenUserModal,
    onClose: onCloseUserModal,
    isOpen: isOpenUserModal,
  } = useDisclosure();

  const { getProjectAction, getProjectStatus, projectData } = useProjectStore((s) => ({
    getProjectAction: s.getProjectAction,
    getProjectStatus: s.getProjectStatus,
    projectData: s.projectData,
  }));

  let userData;

  useEffect(() => {
    userData = JSON.parse(localStorage.getItem("userData"));
    const { email } = userData || {};
    if (userData) {
      getProjectAction({ user: email });
    }
  }, [getProjectAction]);

  useEffect(() => {
    if (!userData) {
      onOpenUserModal();
    }
  }, [userData, onOpenUserModal]);

  const handleModal = () => {
    onOpen();
  };

  return (
    <Box mt={5}>
      <Box w={"80%"} margin={"auto"}>
        <BackToHomebtn />
        <Loader loading={getProjectStatus == STATUS.FETCHING}>
          {projectData?.length ? (
            <ProjectGrid projects={projectData} handleModal={handleModal} />
          ) : (
            <NoProject handleModal={handleModal} />
          )}
        </Loader>
      </Box>
      {isOpen && <AddProjectModal isOpen={isOpen} onClose={onClose} />}
      {isOpenUserModal && <UserModal isOpen={isOpenUserModal} onClose={onCloseUserModal} />}
    </Box>
  );
};
