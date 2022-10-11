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

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="players">
          <Route index element={<Players />} />
        </Route>
        <Route path="parts">
          <Route index element={<Parts />} />
        </Route>
        <Route path="achievements">
          <Route index element={<Achievements />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
