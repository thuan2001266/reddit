import useDirectory from "@/hooks/useDirectory";
import { Box, Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  icon,
  iconColor,
  link,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width={"100%"}
      fontSize={"10pt"}
      _hover={{ bg: "gray.100" }}
      onClick={() => {
        onSelectMenuItem({ displayText, icon, iconColor, link, imageURL });
      }}
    >
      <Flex align={"center"}>
        {imageURL ? (
          <Image
            src={imageURL}
            borderRadius={"full"}
            boxSize={"18px"}
            mr={2}
          ></Image>
        ) : (
          <Box boxSize={"18px"} mr={2}>
            <Icon as={icon} fontSize={20} color={iconColor}></Icon>
          </Box>
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
