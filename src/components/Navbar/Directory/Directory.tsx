import { authModalState } from "@/atoms/authModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { TiHome } from "react-icons/ti";
import Comunities from "./Comunities";
const Directory: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        mr={2}
        ml={{ base: 2, md: 4 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align={"center"}>
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }}></Icon>
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600}>Home</Text>
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
