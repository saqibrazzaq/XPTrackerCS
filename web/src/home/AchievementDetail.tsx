import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PlayerApi } from "../apis/playerApi";
import { PlayerAchievementResponseDto } from "../dtos/Player";

interface AchievementDetailProps {
  playerId?: string;
  partId?: string;
}

const AchievementDetail: React.FC<AchievementDetailProps> = ({
  playerId,
  partId,
}) => {
  const toast = useToast();
  const [playerAchievements, setPlayerAchievements] = useState<
    PlayerAchievementResponseDto[]
  >([]);

  useEffect(() => {
    loadPlayerAchievements();
  }, [playerId, partId]);

  const loadPlayerAchievements = () => {
    PlayerApi.getAchievements(playerId, partId).then((res) => {
      setPlayerAchievements(res);
    });
  };

  const updateAchievement = (playerAchievementId?: string, isComplete?: boolean) => {
    PlayerApi.completeAchievement(playerAchievementId, !isComplete)
      .then((res) => {
        loadPlayerAchievements();
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

  const showPlayerAchievements = () => (
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
                    updateAchievement(item.playerAchievementId, item.isComplete);
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

  return <div>{showPlayerAchievements()}</div>;
};

export default AchievementDetail;
