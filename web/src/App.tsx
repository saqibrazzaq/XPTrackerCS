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

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  </BrowserRouter>
);
