import { authModalState } from "@/atoms/authModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { TiHome } from "react-icons/ti";
import Comunities from "./Comunities";
import useDirectory from "@/hooks/useDirectory";
const Directory: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        mr={2}
        ml={{ base: 2, md: 4 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align={"center"}>
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                borderRadius={"full"}
                boxSize={"24px"}
                mr={2}
              ></Image>
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
                fontSize={24}
                mr={{ base: 1, md: 2 }}
              ></Icon>
            )}

            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon></ChevronDownIcon>
        </Flex>
      </MenuButton>
      <MenuList>
        <Comunities></Comunities>
      </MenuList>
    </Menu>
  );
};
export default Directory;
