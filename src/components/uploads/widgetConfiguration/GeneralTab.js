import { STATUS } from "@/constants";
import { useProjectStore } from "@/store/project";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export const GeneralTab = ({ project }) => {
  const { handleSubmit, control, reset } = useForm();

  const { updateProjectAction, updateProjectStatus, resetProjectStatus } = useProjectStore((s) => ({
    updateProjectAction: s.updateProjectAction,
    updateProjectStatus: s.updateProjectStatus,
    resetProjectStatus: s.resetProjectStatus,
  }));

  useEffect(() => {
    const { generalConfig } = project || {};
    reset({ ...generalConfig });
  }, [project]);


  const onSubmit = (data) => {
    updateProjectAction({ id: project._id, generalConfig: { ...data } });
  };

  useEffect(() => {
    if (updateProjectStatus === STATUS.SUCCESS) {
      resetProjectStatus();
    }
  }, [updateProjectStatus, resetProjectStatus]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl>
            <FormLabel fontSize={"x-large"} mb={1}>
              Chatbot Name
            </FormLabel>
            <Controller
              control={control}
              name="chatBotName"
              render={({ field }) => <Input {...field} size={"lg"} borderColor={"gray.300"} />}
            />
            <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"x-large"} mb={1}>
              Welcome Message
            </FormLabel>
            <Controller
              control={control}
              name="welcomeMessage"
              render={({ field }) => <Input {...field} size={"lg"} borderColor={"gray.300"} />}
            />
            <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={"x-large"} mb={1}>
              Input Placeholder
            </FormLabel>
            <Controller
              control={control}
              name="inputPlaceholder"
              render={({ field }) => <Input {...field} size={"lg"} borderColor={"gray.300"} />}
            />
            <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
          </FormControl>
          <Flex justify={"right"}>
            <Button
              type="submit"
              colorScheme={"purple"}
              isLoading={updateProjectStatus === STATUS.FETCHING}
              loadingText="Updating..."
            >
              Update
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
