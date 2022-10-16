import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { PartApi } from "../apis/partApi";
import { PartResponseDto } from "../dtos/part";
import { PlayerResponseDto } from "../dtos/Player";
import AchievementDetail from "./AchievementDetail";

interface AchievementTabProps {
  player?: PlayerResponseDto;
}

const AchievementTabs: React.FC<AchievementTabProps> = ({ player }) => {
  const [parts, setParts] = useState<PartResponseDto[]>([]);
  useEffect(() => {
    player?.playerId && loadParts();
  }, [player?.playerId]);

  const loadParts = () => {
    PartApi.getAll().then((res) => setParts(res));
  };

  const showAchievements = () => (
    <Tabs>
      <TabList>
        {parts.map((item) => (
          <Tab key={item.partId}>{item.name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {parts.map((item) => (
          <TabPanel key={item.partId}>
            <AchievementDetail player={player} partId={item.partId} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"max"}>
        {player?.playerId && showAchievements()}
      </Stack>
    </Box>
  );
};

export default AchievementTabs;
