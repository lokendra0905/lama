import { STATUS } from "@/constants";
import { useProjectStore } from "@/store/project";
import { ErrorAlert, SuccessAlert } from "@/utils/Helper";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Img,
  Input,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";

export const DisplayTab = ({ project }) => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      primaryColor: "#7BD568",
      fontColor: "#3C3C3C",
    },
  });
  const [uploadImageStatus, setUploadImageStatus] = useState(STATUS.NOT_STARTED);
  const [imageUrl, setImageUrl] = useState();

  const { updateProjectAction, updateProjectStatus, resetProjectStatus } = useProjectStore((s) => ({
    updateProjectAction: s.updateProjectAction,
    updateProjectStatus: s.updateProjectStatus,
    resetProjectStatus: s.resetProjectStatus,
  }));

  useEffect(() => {
    const { displayConfig } = project || {};
    reset({ ...displayConfig });
    setImageUrl(displayConfig?.imageUrl);
  }, [project]);

  const primaryColor = watch("primaryColor");
  const fontColor = watch("fontColor");

  const handleFileChange = (e) => {
    const data = new FormData();
    const file = e.target.files[0];
    if (file) {
      data.append("file", file);
      data.append("upload_preset", "atwdlvty");
      data.append("cloud_name", "dho03uvkn");
      setUploadImageStatus(STATUS.FETCHING);
      fetch("https://api.cloudinary.com/v1_1/dho03uvkn/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUploadImageStatus(STATUS.SUCCESS);
          SuccessAlert("Image Uploaded");
          setImageUrl(data?.url);
        })
        .catch((err) => {
          setImageUrl(null);
          setUploadImageStatus(STATUS.FAILED);
          ErrorAlert(err.error.message || "Something went Wrong");
        });
    }
  };

  const onSubmit = (data) => {
    updateProjectAction({ id: project._id, displayConfig: { ...data, imageUrl } });
  };

  useEffect(() => {
    if (updateProjectStatus === STATUS.SUCCESS) {
      resetProjectStatus();
    }
  }, [updateProjectStatus, resetProjectStatus]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={10}>
          <HStack gap={16}>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Primary Color
              </FormLabel>
              <Controller
                control={control}
                name="primaryColor"
                render={({ field }) => (
                  <HStack gap={4}>
                    <Input size={"md"} isReadOnly value={primaryColor} borderColor={"gray.300"} />
                    <Input
                      {...field}
                      type="color"
                      w={12}
                      h={12}
                      size={"md"}
                      borderColor={"gray.300"}
                      p={0}
                      border={"none"}
                      borderRadius={"lg"}
                    />
                  </HStack>
                )}
              />
              <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Font Color
              </FormLabel>
              <Controller
                control={control}
                name="fontColor"
                render={({ field }) => (
                  <HStack gap={4}>
                    <Input size={"md"} isReadOnly value={fontColor} borderColor={"gray.300"} />
                    <Input
                      {...field}
                      type="color"
                      w={12}
                      h={12}
                      size={"md"}
                      borderColor={"gray.300"}
                      p={0}
                      border={"none"}
                      borderRadius={"lg"}
                    />
                  </HStack>
                )}
              />
              <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
            </FormControl>
          </HStack>
          <HStack gap={20}>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Font Size (in px)
              </FormLabel>
              <Controller
                control={control}
                name="fontSize"
                render={({ field }) => <Input {...field} size={"md"} borderColor={"gray.300"} />}
              />
              <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Chat Height (in % of total screen)
              </FormLabel>
              <Controller
                control={control}
                name="chatHeigth"
                render={({ field }) => <Input {...field} size={"md"} borderColor={"gray.300"} />}
              />
              <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
            </FormControl>
          </HStack>
          <HStack justify={"space-between"} align={"center"}>
            <Box w={"50%"}>
              <Text fontSize={"x-large"} fontWeight={"medium"}>
                Show Sources
              </Text>
              <FormControl>
                <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
              </FormControl>
            </Box>
            <FormControl>
              <Flex justify={"right"} align={"center"}>
                <Controller
                  control={control}
                  name="showSources"
                  defaultValue="true"
                  render={({ field }) => (
                    <Switch {...field} defaultChecked colorScheme="purple" size="lg" />
                  )}
                />
              </Flex>
            </FormControl>
          </HStack>
          <Divider borderColor={"gray.400"} borderWidth={"2px"} />
          <Text color={"purple.600"} fontSize={"x-large"} fontWeight={"bold"} mb={-4}>
            Chat Icon
          </Text>
          <HStack gap={20}>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Chat Height (in % of total screen)
              </FormLabel>
              <Controller
                control={control}
                name="chatIconSize"
                render={({ field }) => (
                  <Select {...field} placeholder="Select Chat Height">
                    <option value={"small"}> Small (48x48 px) </option>
                    <option value={"medium"}> Medium (60x60 px) </option>
                    <option value={"large"}> Large (72x72 px) </option>
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Position on Screen
              </FormLabel>
              <Controller
                control={control}
                name="position"
                render={({ field }) => (
                  <Select {...field} placeholder="Select Position">
                    <option value={"BottomRight"}> Bottom Right </option>
                    <option value={"TopRight"}> Top Right </option>
                  </Select>
                )}
              />
            </FormControl>
          </HStack>
          <HStack gap={20}>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Distance from Bottom (in px)
              </FormLabel>
              <Controller
                control={control}
                name="distancefromBottom"
                render={({ field }) => (
                  <Input {...field} type="number" size={"md"} borderColor={"gray.300"} />
                )}
              />
              <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} mb={1}>
                Horizontal Distance (in px)
              </FormLabel>
              <Controller
                control={control}
                name="hDistance"
                render={({ field }) => (
                  <Input {...field} type="number" size={"md"} borderColor={"gray.300"} />
                )}
              />
              <FormHelperText>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</FormHelperText>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel fontSize={"large"} mb={1}>
              Bot Icon
            </FormLabel>
            <HStack mt={3}>
              <Avatar src={imageUrl || "/assets/empty.png"} boxSize={20} />
              <Box position={"relative"}>
                <Button
                  colorScheme={"purple"}
                  bg={"#7E22CE"}
                  rightIcon={<MdOutlineFileUpload />}
                  isLoading={uploadImageStatus === STATUS.FETCHING}
                  loadingText="Uploading"
                >
                  Upload Image
                </Button>
                <Input
                  type="file"
                  w={"40"}
                  position={"absolute"}
                  top={0}
                  left={0}
                  opacity={0}
                  cursor={"pointer"}
                  onChange={handleFileChange}
                />
                <Text color={"gray.400"} fontSize={"xs"} mt={1}>
                  Recommended Size : 48x48 px
                </Text>
              </Box>
            </HStack>
          </FormControl>
          <Flex justify={"right"} mt={-5}>
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
