import { communityState } from "@/atoms/communitiesAtom";
import About from "@/components/Community/About";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type submitProps = {};

const Submit: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();
  return (
    <>
      <Head>
        <title>
          {communityStateValue.currentCommunity?.id
            ? "Post on r/" + communityStateValue.currentCommunity?.id
            : "Error"}
        </title>
        <link rel="icon" href="/images/redditFace.svg" />
      </Head>
      <PageContent>
        <>
          <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
            <Text>Create a post</Text>
          </Box>
          {user && (
            <NewPostForm
              user={user}
              communityImageURL={communityStateValue.currentCommunity?.imageURL}
            ></NewPostForm>
          )}
        </>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity}></About>
          )}
        </>
      </PageContent>
    </>
  );
};
export default Submit;
