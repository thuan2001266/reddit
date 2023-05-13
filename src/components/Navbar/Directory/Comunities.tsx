import { communityState } from "@/atoms/communitiesAtom";
import CreateCommunityModal from "@/components/Modal/CreateComunity/CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { Key, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "@/hooks/useCommunityData";
type ComunitiesProps = {};

const Comunities: React.FC<ComunitiesProps> = () => {
  const [open, setOpen] = useState(false);

  // const mySnippets = useRecoilValue(communityState).mySnippets;

  const mySnippets = useCommunityData().communityStateValue.mySnippets;
  // console.log("communityStateValue:", communityStateValue);

  return (
    <Box maxHeight={"445px"} overflowY={"scroll"}>
      <CreateCommunityModal
        open={open}
        handleClose={() => setOpen(false)}
      ></CreateCommunityModal>
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId as Key}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="brand.500"
              imageURL={snippet.imageURL}
            ></MenuListItem>
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          MY COMMUNITIES
        </Text>
        <MenuItem
          width={"100%"}
          fontSize={"10pt"}
          _hover={{ bg: "gray.100" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Flex align={"center"}>
            <Icon as={GrAdd} fontSize={20} mr={2}></Icon>Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId as Key}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          ></MenuListItem>
        ))}
      </Box>
    </Box>
  );
};
export default Comunities;
