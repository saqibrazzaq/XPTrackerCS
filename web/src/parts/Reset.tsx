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
import { PartApi } from "../apis/partApi";

const Reset = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  const [partsCount, setPartsCount] = useState<number>(0);
  const [achievementsCount, setAchievementsCount] = useState<number>(0);

  const toast = useToast();
  const navigate = useNavigate();
  
  const resetAchievements = () => {
    onClose();
    AchievementApi.reset().then(res => {
      toast({
        title: "Success",
        description: "Achievements reset successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/parts");
    });
  };

  const showPartsInfo = () => (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Parts count</Th>
              <Td>{partsCount}</Td>
            </Tr>
            <Tr>
              <Th>Achievements count</Th>
              <Td>{achievementsCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Link onClick={onOpen}>
          <Button type="button" colorScheme={"red"}>YES, I WANT TO RESET ALL PARTS AND ACHIEVEMENTS</Button>
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
            Reset All Parts and Achievements
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>Cancel</Button>
            </Link>
            <Link onClick={resetAchievements} ml={3}>
              <Button type="submit" colorScheme={"red"}>Reset Achievements</Button>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  useEffect(() => {
    loadPartsCount();
    loadAchievementsCount();
  }, []);

  const loadPartsCount = () => {
    PartApi.count().then(res => {
      setPartsCount(res);
      console.log("parts count: " + res);
    })
    
  };

  const loadAchievementsCount = () => {
    AchievementApi.count().then(res => {
      setAchievementsCount(res);
      console.log("Achievements count: " + res);
    });
  }

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Reset All Parts and Achievements</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} as={RouteLink} to={"/parts"}>
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
          Are you sure you want to RESET All the Parts and Achievements?
        </Text>
        {showPartsInfo()}
      </Stack>
      {showAlertDialog()}
    </Box>
  )
}

export default Reset