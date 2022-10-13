import React, { useEffect, useState } from "react";
import { AchievementResponseDto } from "../dtos/achievement";
import { Box, Button, Container, Flex, Heading, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import UpdateIconButton from "../components/UpdateIconButton";
import DeleteIconButton from "../components/DeleteIconButton";
import { AchievementApi } from "../apis/achievementApi";
import ViewIconButton from "../components/ViewIconButton";
import { PartApi } from "../apis/partApi";
import { PartResponseDto } from "../dtos/part";


const Achievements = () => {
  const [achievements, setAchievements] = useState<AchievementResponseDto[]>([]);
  const [part, setPart] = useState<PartResponseDto>();
  const params = useParams();
  const partId = params.partId;

  useEffect(() => {
    loadAchievements();
  }, [partId]);

  useEffect(() => {
    loadPart();
  }, [partId]);

  const loadPart = () => {
    PartApi.get(partId).then(res => {
      setPart(res);
    })
  }

  const loadAchievements = () => {
    AchievementApi.list(partId).then(res => {
      setAchievements(res);
    });
  }

  const showHeading = () => (
    <VStack spacing={4}>
      <Heading fontSize={"3xl"}>{part?.name}</Heading>
      <Flex>
      <Box>
        <Heading fontSize={"xl"}>Achievements</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/achievements/" + partId + "/update"}
        >
          <Button colorScheme={"blue"}>Create Achievement</Button>
        </Link>
        <Link
          ml={2}
          as={RouteLink}
          to={"/parts"}
        >
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
    </VStack>
  )

  const showParts = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Page</Th>
            <Th>Xp</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {achievements.map((item) => (
              <Tr key={item.achievementId}>
                <Td>
                  {item.name}
                </Td>
                <Td>
                  {item.page}
                </Td>
                <Td>
                  {item.xp}
                </Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/achievements/" + partId + "/update/" + item.achievementId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/achievements/" + partId + "/delete/" + item.achievementId}
                  >
                    <DeleteIconButton />
                  </Link>
                </Td>
              </Tr>
            ))}
  
        </Tbody>
      </Table>
    </TableContainer>
  )
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"max"}>
        {showHeading()}
        {showParts()}
      </Stack>
    </Box>
  )
}

export default Achievements