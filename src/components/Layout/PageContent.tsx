import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex w={"full"} p={"16px 0px"} justify={"center"}>
      <Flex width={"95%"} justify={"center"} maxWidth={"860px"}>
        {/* left */}
        <Flex
          direction={"column"}
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children[0 as keyof typeof children]}
        </Flex>
        {/* right */}
        <Flex
          direction={"column"}
          flexGrow={1}
          display={{ base: "none", md: "flex" }}
        >
          {children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
