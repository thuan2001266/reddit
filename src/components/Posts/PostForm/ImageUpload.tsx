import { Box, Button, Flex, Image, Input, Stack } from "@chakra-ui/react";
import { useRef } from "react";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectedImage,
  setSelectedTab,
  setSelectedFile,
}) =>
  // { onSelectedImage }
  {
    const selectedFileRef = useRef<HTMLInputElement>(null);
    return (
      <Flex
        justify={"center"}
        direction={"column"}
        align={"center"}
        width={"100%"}
      >
        {selectedFile ? (
          <>
            <Image
              src={selectedFile}
              maxWidth={"400px"}
              maxHeight={"400px"}
            ></Image>
            <Stack direction={"row"} mt={4}>
              <Button
                height={"28px"}
                onClick={() => {
                  setSelectedTab("Post");
                }}
              >
                Back to Post
              </Button>
              <Button
                variant={"outline"}
                height={"28px"}
                onClick={() => setSelectedFile("")}
              >
                Remove
              </Button>
            </Stack>
          </>
        ) : (
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            p={20}
            border="1px dashed"
            borderColor={"gray.200"}
            width={"100%"}
            borderRadius={4}
          >
            <Box pb={6}>
              <img src={selectedFile}></img>
            </Box>
            <Button
              variant={"outline"}
              height={"28px"}
              onClick={() => {
                selectedFileRef.current?.click();
              }}
            >
              Upload
            </Button>
            <input
              type="file"
              ref={selectedFileRef}
              hidden
              onChange={onSelectedImage}
            ></input>
          </Flex>
        )}
      </Flex>
    );
  };
export default ImageUpload;
