import React, { useEffect, useState } from "react";
import { LevelResponseDto } from "../dtos/level";
import { Box, Button, Container, Flex, Heading, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import UpdateIconButton from "../components/UpdateIconButton";
import DeleteIconButton from "../components/DeleteIconButton";
import { LevelApi } from "../apis/levelApi";
import ViewIconButton from "../components/ViewIconButton";

const Levels = () => {
  const [levels, setLevels] = useState<LevelResponseDto[]>([]);

  useEffect(() => {
    loadLevels();
  }, []);

  const loadLevels = () => {
    LevelApi.getAll().then(res => {
      setLevels(res);
    });
  }

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Levels</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/levels/reset"}
        >
          <Button colorScheme={"red"}>Reset Levels</Button>
        </Link>
        <Link
          ml={2}
          as={RouteLink}
          to={"/levels/update"}
        >
          <Button colorScheme={"blue"}>Create Level</Button>
        </Link>
      </Box>
    </Flex>
  )

  const showLevels = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Min Experience</Th>
            <Th>Max Experience</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {levels.map((item) => (
              <Tr key={item.levelId}>
                <Td>
                  {item.name}
                </Td>
                <Td>
                  {item.minExp}
                </Td>
                <Td>
                  {item.maxExp}
                </Td>
                <Td>
                <Link
                    mr={2}
                    as={RouteLink}
                    to={"/levels/update/" + item.levelId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/levels/delete/" + item.levelId}
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
        {showLevels()}
      </Stack>
    </Box>
  )
}

export default Levels