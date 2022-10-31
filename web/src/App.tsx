import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./home/Home";
import Players from "./players/Players";
import Parts from "./parts/Parts";
import Achievements from "./achievements/Achievements";
import EditPlayer from "./players/EditPlayer";
import DeletePlayer from "./players/DeletePlayer";
import EditPart from "./parts/EditPart";
import EditAchievement from "./achievements/EditAchievement";
import DeletePart from "./parts/DeletePart";
import DeleteAchievement from "./achievements/DeleteAchievement";
import Levels from "./levels/Levels";
import EditLevel from "./levels/EditLevel";
import DeleteLevel from "./levels/DeleteLevel";
import Reset from "./parts/Reset";
import ResetLevels from "./levels/ResetLevels";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="players">
          <Route index element={<Players />} />
          <Route path="update" element={<EditPlayer />} />
          <Route path="update/:playerId" element={<EditPlayer />} />
          <Route path="delete/:playerId" element={<DeletePlayer />} />
        </Route>
        <Route path="levels">
          <Route index element={<Levels />} />
          <Route path="update" element={<EditLevel />} />
          <Route path="update/:levelId" element={<EditLevel />} />
          <Route path="delete/:levelId" element={<DeleteLevel />} />
          <Route path="reset" element={<ResetLevels />} />
        </Route>
        <Route path="parts">
          <Route index element={<Parts />} />
          <Route path="update" element={<EditPart />} />
          <Route path="update/:partId" element={<EditPart />} />
          <Route path="delete/:partId" element={<DeletePart />} />
          <Route path="reset" element={<Reset />} />
        </Route>
        <Route path="achievements/:partId">
          <Route index element={<Achievements />} />
          <Route path="update" element={<EditAchievement />} />
          <Route path="update/:achievementId" element={<EditAchievement />} />
          <Route path="delete/:achievementId" element={<DeleteAchievement />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
