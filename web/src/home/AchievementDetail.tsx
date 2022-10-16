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
import { useNavigate, redirect } from "react-router-dom";
import { PlayerApi } from "../apis/playerApi";
import { PlayerAchievementMarkCompleteDto, PlayerAchievementResponseDto, PlayerResponseDto } from "../dtos/Player";

interface AchievementDetailProps {
  player?: PlayerResponseDto;
  partId?: string;
}

const AchievementDetail: React.FC<AchievementDetailProps> = ({
  player,
  partId,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [playerAchievements, setPlayerAchievements] = useState<
    PlayerAchievementResponseDto[]
  >([]);

  useEffect(() => {
    loadPlayerAchievements();
  }, [player?.playerId, partId]);

  const loadPlayerAchievements = () => {
    PlayerApi.getAchievements(player?.playerId, partId).then((res) => {
      setPlayerAchievements(res);
    });
  };

  const updateAchievement = (playerAchievementId?: string, isComplete?: boolean, xp?: number) => {
    const dto = new PlayerAchievementMarkCompleteDto(!isComplete, xp);
    PlayerApi.completeAchievement(playerAchievementId, dto)
      .then((res) => {
        loadPlayerAchievements();
        navigate("/", {replace: true})
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
                    updateAchievement(item.playerAchievementId, item.isComplete, item.achievement?.xp);
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
