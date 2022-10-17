import { Box, Button, Checkbox, Container, Flex, Heading, HStack, Link, Progress, Select, Spacer, Stack, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr, useToast, VStack } from '@chakra-ui/react'
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PlayerAchievementMarkCompleteDto, PlayerAchievementResponseDto, PlayerResponseDto } from '../dtos/Player';
import { PlayerApi } from '../apis/playerApi';
import Achievements from './Achievements';
import { FaCrown } from 'react-icons/fa';
import { LevelResponseDto } from '../dtos/level';
import { LevelApi } from '../apis/levelApi';
import AchievementDetail from './AchievementDetail';
import { PartResponseDto } from '../dtos/part';
import { PartApi } from '../apis/partApi';

const Home = () => {

  const [players, setPlayers] = useState<PlayerResponseDto[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerResponseDto>();
  const [currentLevelPercentage, setCurrentLevelPercentage] = useState(0);
  const [level, setLevel] = useState<LevelResponseDto>();
  const [parts, setParts] = useState<PartResponseDto[]>([]);
  const [playerAchievements, setPlayerAchievements] = useState<
    PlayerAchievementResponseDto[]
  >([]);
  const [tabIndex, setTabIndex] = useState(0)
  const toast = useToast();
  
  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    let start = (selectedPlayer?.experience || 0) - (level?.minExp || 0);
    let end = (level?.maxExp || 0) - (level?.minExp || 0);
    // console.log("start: " + start);
    setCurrentLevelPercentage(start/end * 100);
  }, [level]);
  
  useEffect(() => {
      loadLevel();
      loadParts();
  }, [selectedPlayer?.playerId, selectedPlayer?.experience]);

  useEffect(() => {
    loadPlayerAchievements(parts[tabIndex]?.partId);
  }, [selectedPlayer?.playerId, tabIndex]);
  
  const loadParts = () => {
    PartApi.getAll().then((res) => setParts(res));
  };

  const loadPlayerAchievements = (partId?: string) => {
    if (selectedPlayer?.playerId) {
      PlayerApi.getAchievements(selectedPlayer?.playerId, partId).then((res) => {
        loadSelectedPlayer(selectedPlayer?.playerId);
        setPlayerAchievements(res);
      });
    }
    
  };

  const loadSelectedPlayer = (playerId?: string) => {
    PlayerApi.get(playerId).then(res => {
      setSelectedPlayer(res);
    });
  }

  const loadPlayers = () => {
    PlayerApi.getAll().then(res => {
      setPlayers(res);
    });
  }

  const loadLevel = () => {
    LevelApi.findByExperience(selectedPlayer?.experience).then((res) => {
      setLevel(res);
    });
    
  };
  
  const showHeading = () => (
    <Text fontSize={"xl"}>Track progress for learning C#</Text>
  )

  const showPlayerDropdown = () => (
    <Select width={"300px"} placeholder='Select player ...' onChange={(e) => {
      let index = e.target.selectedIndex - 1;
      loadSelectedPlayer(e.target.value);
      if (index < 0) setSelectedPlayer(new PlayerResponseDto());
    }}>
      {players.map(item => (
        <option key={item.playerId} value={item.playerId} >{item.name}</option>
      ))}
    </Select>
  )

  const updateAchievement = (playerAchievementId?: string, isComplete?: boolean, xp?: number, partId?: string) => {
    const dto = new PlayerAchievementMarkCompleteDto(!isComplete, xp);
    PlayerApi.completeAchievement(playerAchievementId, dto)
      .then((res) => {
        loadPlayerAchievements(partId);
        //navigate("/", {replace: true})
        toast({
          title: "Success",
          description: "Achievement updated successfully.",
          status: "success",
          position: "top-right",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed",
          description: "Achievement was not updated.",
          status: "error",
          position: "top-right",
        });
      });
  };

  const showLevelProgress = () => (
    <HStack spacing={6}>
      <Box>
        <FaCrown size={"70"} />
      </Box>
      <VStack spacing={1} padding={1}>
        <Text fontSize={"xl"}>{selectedPlayer?.experience} Experience points</Text>
        <Progress width={"100%"} colorScheme="blue" size="lg" value={currentLevelPercentage} />
        <Text fontSize={"3xl"}>{level?.name}</Text>
      </VStack>
    </HStack>
  );
  
  const showAchievements = () => (
    <Tabs onChange={(index) => setTabIndex(index)}>
      <TabList>
        {parts.map((item) => (
          <Tab key={item.partId}>{item.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {parts.map((item) => (
          <TabPanel key={item.partId}>
            {/* <AchievementDetail player={selectedPlayer} partId={item.partId} /> */}
            {showPlayerAchievements(item.partId)}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );

  const showPlayerAchievements = (partId?: string) => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Page</Th>
            <Th>Name</Th>
            <Th>Xp</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {playerAchievements.map((item) => (
            <Tr key={item.playerAchievementId}>
              <Td>
                <Checkbox
                  isChecked={item.isComplete}
                  onChange={(e) => {
                    updateAchievement(item.playerAchievementId, item.isComplete, item.achievement?.xp, partId);
                  }}
                ></Checkbox>
              </Td>
              <Td>{item.achievement?.page}</Td>
              <Td>{item.achievement?.name}</Td>
              <Td>{item.achievement?.xp}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} align={"center"} as={Container} maxW={"max"}>
        {showHeading()}
        {showPlayerDropdown()}
        {selectedPlayer?.playerId && showLevelProgress()}
        {selectedPlayer?.playerId && showAchievements()}
      </Stack>
    </Box>
  )
}

export default Home