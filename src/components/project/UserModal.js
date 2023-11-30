import { useProjectStore } from "@/store/project";
import { SuccessAlert } from "@/utils/Helper";
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
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const UserModal = ({ isOpen, onClose }) => {
  const { control, handleSubmit } = useForm();

  const { getProjectAction } = useProjectStore((s) => ({
    getProjectAction: s.getProjectAction,
  }));

  const onSubmit = ({ userName, email }) => {
    localStorage.setItem("userData", JSON.stringify({ userName, email }));
    onClose();
    SuccessAlert("Login Success");
    getProjectAction({ user: email });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"xl"}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>User Data</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Controller
                control={control}
                name="userName"
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Your Name" w={"full"} />
                )}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input {...field} placeholder="Enter Your Email" type="email" w={"full"} />
                )}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justify={"end"} gap={4}>
              <Button type="submit" colorScheme={"purple"}>
                Login
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
