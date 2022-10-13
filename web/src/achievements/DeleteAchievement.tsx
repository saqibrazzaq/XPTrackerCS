import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { AchievementApi } from "../apis/achievementApi";
import { AchievementResponseDto } from "../dtos/achievement";

const DeleteAchievement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [achievement, setAchievement] = useState<AchievementResponseDto>();
  
  const toast = useToast();
  const navigate = useNavigate();
  let params = useParams();
  const partId = params.partId;
  const achievementId = params.achievementId;
  
  const deleteAchievement = () => {
    onClose();
    AchievementApi.delete(achievementId).then(res => {
      toast({
        title: "Success",
        description: achievement?.name + " deleted successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/achievements/" + partId);
    });
  };

  const showAchievementsInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Part</Th>
              <Td>{achievement?.part?.name}</Td>
            </Tr>
            <Tr>
              <Th>Name</Th>
              <Td>{achievement?.name}</Td>
            </Tr>
            <Tr>
              <Th>Page</Th>
              <Td>{achievement?.page}</Td>
            </Tr>
            <Tr>
              <Th>Xp</Th>
              <Td>{achievement?.xp}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO DELETE THIS ACHIEVEMENT</Button>
        </Link>
      </HStack>
    </div>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Achievement
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={deleteAchievement} ml={3}>
              <Button type="submit" colorScheme={"red"}>Delete Achievement</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadAchievement();
  }, []);

  const loadAchievement = () => {
    if (achievementId) {
      AchievementApi.get(achievementId).then(res => {
        setAchievement(res);
        // console.log(res);
      })
    }
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Achievement</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/achievements/" + partId}>
          <Button type="button" colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        <Text fontSize="xl">
          Are you sure you want to delete the following Achievement?
        </Text>
        {showAchievementsInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default DeleteAchievement