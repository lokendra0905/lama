import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Header } from "../uploads/Header";
import { Controller, useForm } from "react-hook-form";
import { SuccessAlert } from "@/utils/Helper";

export const AccountSettings = () => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const { userName, email } = JSON.parse(localStorage.getItem("userData"));
    reset({ userName, email });
  }, []);

  const onSubmit = (userData) => {
    localStorage.setItem("userData", JSON.stringify({ ...userData }));
    SuccessAlert("Profile Updated");
  };

  return (
    <Box px={3}>
      <Header page={"Account Settings"} />
      <Box mt={10} px={3}>
        <Heading color={"purple.600"}>Account Settings</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack spacing={10} mt={10}>
            <Avatar src="/assets/profile.png" size={"2xl"} />
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Controller
                control={control}
                name="userName"
                render={({ field }) => (
                  <Input {...field} onEnter placeholder="Enter Your Name" w={"full"} />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    isReadOnly
                    placeholder="Enter Your Email"
                    type="email"
                    w={"full"}
                  />
                )}
              />
            </FormControl>
          </HStack>
          <Button display={"none"} type="submit"></Button>
        </form>
        <Text fontSize={"xx-large"} fontWeight={"bold"} color="purple.600" mt={5}>
          Subscriptions
        </Text>
        <Card variant={"solid"} bg={"#7E22CE"} p={4} px={7} mt={4}>
          <Flex align={"center"} justify={"space-between"}>
            <Text color={"white"} fontSize={"x-large"} fontWeight={"bold"} display={"flex"} gap={3}>
              You are currently on the <Text textDecoration={"underline"}>Ques AI Basic Plan!</Text>
            </Text>
            <Button>Upgrade</Button>
          </Flex>
        </Card>
        <Text fontWeight={"medium"} textDecor={"underline"} color={"red"} mt={4}>
          Cancel Subscription
        </Text>
      </Box>
    </Box>
  );
};
