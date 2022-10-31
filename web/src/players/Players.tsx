import React, { useEffect, useState } from "react";
import { PlayerResponseDto } from '../dtos/Player';
import { PlayerApi } from '../apis/playerApi';
import { Box, Button, Container, Flex, Heading, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import UpdateIconButton from "../components/UpdateIconButton";
import DeleteIconButton from "../components/DeleteIconButton";

const Players = () => {
  const [players, setPlayers] = useState<PlayerResponseDto[]>([]);

  useEffect(() => {
    console.log("URL: " + process.env.REACT_APP_API_BASE_URL)
    loadPlayers();
  }, []);

  const loadPlayers = () => {
    PlayerApi.getAll().then(res => {
      setPlayers(res);
    });
  }

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Player List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/players/update"}
        >
          <Button colorScheme={"blue"}>Create Player</Button>
        </Link>
      </Box>
    </Flex>
  )

  const showPlayers = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Experience</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map((item) => (
              <Tr key={item.playerId}>
                <Td>
                  {item.name}
                </Td>
                <Td>
                  {item.experience}
                </Td>
                <Td>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/players/update/" + item.playerId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/players/delete/" + item.playerId}
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
        {showPlayers()}
      </Stack>
    </Box>
  )
}

export default Players