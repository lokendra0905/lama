import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

export const ConfirmAlert = ({
  isOpen,
  onClose,
  message,
  heading,
  onConfirm,
  loading,
  buttonTitle = "Delete",
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      motionPreset="scale"
    >
      <AlertDialogOverlay>
        <AlertDialogContent color={"black"}>
          <AlertDialogCloseButton color={"black"} />
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} size="sm">
              Cancel
            </Button>
            <Button
              colorScheme={"red"}
              onClick={onConfirm}
              ml={3}
              size="sm"
              isLoading={loading}
              loadingText="Deleting"
            >
              {buttonTitle}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
