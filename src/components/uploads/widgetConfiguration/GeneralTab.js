import { Box, FormControl, FormHelperText, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const GeneralTab = () => {
  const { handleSubmit, control } = useForm();
  return (
    <Box>
      <Stack spacing={5}>
        <FormControl>
          <FormLabel fontSize={"x-large"} mb={1}>
            Chatbot Name
          </FormLabel>
          <Controller
            control={control}
            name="charBotName"
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
      </Stack>
    </Box>
  );
};
