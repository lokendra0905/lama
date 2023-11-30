import { createStandaloneToast } from "@chakra-ui/react";
import dayjs from "dayjs";

const { toast } = createStandaloneToast();

export function SuccessAlert(message = "") {
  toast({
    title: "SUCCESS",
    description: message,
    status: "success",
    duration: 2000,
    isClosable: true,
    position: "top",
  });
}

export function ErrorAlert(message = "") {
  toast({
    title: "FAILED",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
}

export const changeDateFormat = (date) => {
  if (date && dayjs(date).format("YYYY-MM-DD") !== "Invalid Date") {
    return dayjs(date).format("YYYY-MM-DD");
  } else {
    return null;
  }
};
