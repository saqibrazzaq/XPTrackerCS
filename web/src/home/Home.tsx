import { Box, Button, Container, Flex, Heading, Link, Select, Spacer, Stack, Text } from '@chakra-ui/react'
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PlayerResponseDto } from '../dtos/Player';
import { PlayerApi } from '../apis/playerApi';
import AchievementTabs from './AchievementTabs';

const Home = () => {

  const [players, setPlayers] = useState<PlayerResponseDto[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>();

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = () => {
    PlayerApi.getAll().then(res => {
      setPlayers(res);
    });
  }

  const showHeading = () => (
    <Text fontSize={"xl"}>Track progress for learning C#</Text>
  )

  const showPlayerDropdown = () => (
    <Select placeholder='Select player ...' onChange={(e) => {
      // console.log("Player id: " + e.target.value)
      setSelectedPlayerId(e.target.value);
    }}>
      {players.map(item => (
        <option key={item.playerId} value={item.playerId} >{item.name}</option>
      ))}
    </Select>
  )
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"max"}>
        {showHeading()}
        {showPlayerDropdown()}
        <AchievementTabs playerId={selectedPlayerId} />
      </Stack>
    </Box>
  )
}

export default Home