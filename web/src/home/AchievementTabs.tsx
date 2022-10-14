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
import AchievementDetail from "./AchievementDetail";

interface AchievementTabProps {
  playerId?: string;
}

const AchievementTabs: React.FC<AchievementTabProps> = ({ playerId }) => {
  const [parts, setParts] = useState<PartResponseDto[]>([]);
  useEffect(() => {
    playerId && loadParts();
  }, [playerId]);

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
            <AchievementDetail playerId={playerId} partId={item.partId} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"max"}>
        {playerId && showAchievements()}
      </Stack>
    </Box>
  );
};

export default AchievementTabs;
