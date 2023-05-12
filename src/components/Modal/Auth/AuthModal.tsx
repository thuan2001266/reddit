import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import ResetPassword from "./ResetPassword";
import { WarningIcon } from "@chakra-ui/icons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) {
      handleClose();
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
            {modalState.view === "notAvailable" && (
              <Flex align={"center"} justify={"center"} direction={"column"}>
                <Text>Notice</Text>
                <Box w={"36%"} borderBottom={"1px solid"} mt="2"></Box>
              </Flex>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pb={6}
          >
            {modalState.view === "notAvailable" ? (
              <Flex align={"center"} justify={"center"}>
                <Text>This feature is not available yet.</Text>
              </Flex>
            ) : (
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                width={"70%"}
              >
                {modalState.view === "login" || modalState.view === "signup" ? (
                  <>
                    <OAuthButtons></OAuthButtons>
                    <Text color={"gray.400"} fontWeight={700}>
                      OR
                    </Text>
                    <AuthInputs></AuthInputs>
                  </>
                ) : (
                  <ResetPassword></ResetPassword>
                )}
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
