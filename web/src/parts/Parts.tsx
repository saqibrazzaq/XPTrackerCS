import React, { useEffect, useState } from "react";
import { PartResponseDto } from "../dtos/part";
import { Box, Button, Container, Flex, Heading, Link, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link as RouteLink, useParams } from "react-router-dom";
import UpdateIconButton from "../components/UpdateIconButton";
import DeleteIconButton from "../components/DeleteIconButton";
import { PartApi } from "../apis/partApi";
import ViewIconButton from "../components/ViewIconButton";

const Parts = () => {
  const [parts, setParts] = useState<PartResponseDto[]>([]);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = () => {
    PartApi.getAll().then(res => {
      setParts(res);
    });
  }

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Parts</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/parts/reset"}
        >
          <Button colorScheme={"red"}>Reset Achievements</Button>
        </Link>
        <Link
          ml={2}
          as={RouteLink}
          to={"/parts/update"}
        >
          <Button colorScheme={"blue"}>Create Part</Button>
        </Link>
      </Box>
    </Flex>
  )

  const showParts = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Achievements</Th>
            <Th>Sort Order</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {parts.map((item) => (
              <Tr key={item.partId}>
                <Td>
                  {item.name}
                </Td>
                <Td>
                  {item.achievementCount}
                </Td>
                <Td>
                  {item.sortOrder}
                </Td>
                <Td>
                <Link
                    mr={2}
                    as={RouteLink}
                    to={"/achievements/" + item.partId}
                  >
                    <ViewIconButton />
                  </Link>
                  <Link
                    mr={2}
                    as={RouteLink}
                    to={"/parts/update/" + item.partId}
                  >
                    <UpdateIconButton />
                  </Link>
                  <Link
                    as={RouteLink}
                    to={"/parts/delete/" + item.partId}
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

export default Parts