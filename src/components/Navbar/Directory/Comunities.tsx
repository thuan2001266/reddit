import CreateCommunityModal from "@/components/Modal/CreateComunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
type ComunitiesProps = {};

const Comunities: React.FC<ComunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal
        open={open}
        handleClose={() => setOpen(false)}
      ></CreateCommunityModal>
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
    </>
  );
};
export default Comunities;
