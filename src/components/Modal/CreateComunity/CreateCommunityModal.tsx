import { auth, firestore } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFilePersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = { open: boolean; handleClose: () => void };

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charRemaining, setCharRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must contain 3-21 characters of letters, numbers, and underscores"
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(`r/${communityName} is already taken. Try another`);
        }
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          { communityId: communityName, isModerator: true }
        );
      });
      handleClose();
      toggleMenuOpen();
      router.push(`/r/${communityName}`);
    } catch (error: any) {
      setError(error.message);
    }
    setCommunityName("");
    setLoading(false);
    // handleClose();
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            fontSize={15}
            padding={3}
            flexDirection={"column"}
          >
            Create Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              flexDirection={"column"}
              padding={"10px 0px"}
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color={"gray.500"} fontSize={11}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position={"relative"}
                top={"28px"}
                left={"10px"}
                width={"20px"}
                color={"gray.400"}
              >
                r/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size={"sm"}
                pl={"22px"}
                onChange={handleChange}
              ></Input>
              <Text
                color={charRemaining === 0 ? "red" : "gray.500"}
                fontSize={"9pt"}
              >
                {charRemaining} Characters remaining
              </Text>
              <Text fontSize={"9pt"} color={"red"} pt={1}>
                {error}
              </Text>
              <Box my={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={BsFillEyeFill} color={"gray.500"} mr={2}></Icon>
                      <Text fontSize={"10pt"} mr={1}>
                        Public
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon
                        as={BsFilePersonFill}
                        color={"gray.500"}
                        mr={2}
                      ></Icon>
                      <Text fontSize={"10pt"} mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={"center"}>
                      <Icon as={HiLockClosed} color={"gray.500"} mr={2}></Icon>
                      <Text fontSize={"10pt"} mr={1}>
                        Private
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                        Only only approved users can view and post to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg={"gray.100"} borderRadius={"0px 0px 10px 10px"}>
            <Button
              variant={"outline"}
              height={"30px"}
              colorScheme="blue"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height={"30px"}
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
