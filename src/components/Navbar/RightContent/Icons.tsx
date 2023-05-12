import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
// import useDirectory from "../../../hooks/useDirectory";

type ActionIconsProps = {};

const Icons: React.FC<ActionIconsProps> = () => {
  // const { toggleMenuOpen } = useDirectory();
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align={"center"}
        borderRight={"1px solid"}
        borderColor={"gray.200"}
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() =>
            setAuthModalState({ open: true, view: "notAvailable" })
          }
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() =>
            setAuthModalState({ open: true, view: "notAvailable" })
          }
        >
          <Icon as={IoFilterCircleOutline} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() =>
            setAuthModalState({ open: true, view: "notAvailable" })
          }
        >
          <Icon as={IoVideocamOutline} fontSize={20}></Icon>
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() =>
            setAuthModalState({ open: true, view: "notAvailable" })
          }
        >
          <Icon as={BsChatDots} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() =>
            setAuthModalState({ open: true, view: "notAvailable" })
          }
        >
          <Icon as={IoNotificationsOutline} fontSize={20}></Icon>
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          onClick={() =>
            setAuthModalState({ open: true, view: "notAvailable" })
          }
        >
          <Icon as={GrAdd} fontSize={20}></Icon>
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
