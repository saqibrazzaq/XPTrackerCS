import React, { useEffect, useState } from "react";
import { PlayerResponseDto } from '../dtos/Player';
import { PlayerApi } from '../apis/playerApi';
import { Box, Container, Link, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import UpdateIconButton from "../components/UpdateIconButton";
import DeleteIconButton from "../components/DeleteIconButton";

const Players = () => {
  const [players, setPlayers] = useState<PlayerResponseDto[]>([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = () => {
    PlayerApi.getAll().then(res => {
      setPlayers(res);
    });
  }

  const showHeading = () => (
    <Text fontSize={"xl"}>Players List</Text>
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