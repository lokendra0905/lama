import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  ModalFooter,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProjectStore } from "@/store/project";
import { STATUS } from "@/constants";

export const AddProjectModal = ({ isOpen, onClose }) => {
  const { control, handleSubmit } = useForm({ defaultValues: { name: "" } });

  const { addProjectAction, addProjectStatus, resetProjectStatus } = useProjectStore((s) => ({
    addProjectAction: s.addProjectAction,
    addProjectStatus: s.addProjectStatus,
    resetProjectStatus: s.resetProjectStatus,
  }));

  const userData = JSON.parse(localStorage.getItem("userData"));

  const onSubmit = ({ name }) => {
    addProjectAction({ name, email: userData.email });
  };

  useEffect(() => {
    if (addProjectStatus == STATUS.SUCCESS) {
      resetProjectStatus();
      onClose();
    }
  }, [addProjectStatus]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Project Name</FormLabel>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input {...field} placeholder=" Enter Project Name" w={"full"} />
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justify={"end"} gap={4}>
              <Button variant={"outline"} onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                colorScheme={"purple"}
                isLoading={addProjectStatus == STATUS.FETCHING}
                loadingText="Creating..."
              >
                Create
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
