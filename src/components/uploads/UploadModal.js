import { STATUS } from "@/constants";
import { useUploadStore } from "@/store/uploads";
import {
  Box,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  ModalFooter,
  Button,
  Flex,
  Textarea,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const UploadModal = ({ isOpen, onClose, projectId, type }) => {
  const { control, handleSubmit } = useForm();

  const { addUploadAction, addUploadStatus, resetUploadStatus } = useUploadStore((s) => ({
    addUploadAction: s.addUploadAction,
    addUploadStatus: s.addUploadStatus,
    resetUploadStatus: s.resetUploadStatus,
  }));

  const onSubmit = ({ name, desc }) => {
    addUploadAction({ name, desc, projectId, platform: type });
  };

  useEffect(() => {
    if (addUploadStatus === STATUS.SUCCESS) {
      onClose();
      resetUploadStatus();
    }
  }, [addUploadStatus]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Controller
                control={control}
                name="name"
                render={({ field }) => <Input {...field} placeholder="Title" w={"full"} />}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Controller
                control={control}
                name="desc"
                render={({ field }) => <Textarea {...field} w={"full"} />}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justify={"end"} gap={4}>
              <Button
                type="submit"
                colorScheme={"purple"}
                isLoading={addUploadStatus == STATUS.FETCHING}
                loadingText="Saving"
              >
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
