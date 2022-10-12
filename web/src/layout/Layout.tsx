import {
  Box,
  ChakraProvider,
  Code,
  Grid,
  Link,
  Text,
  theme,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Logo } from "../Logo";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center">
        <Grid minH="100vh" p={3}>
          <VStack spacing={1}>
            <Header />
              <Outlet />
            <Footer />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Layout;
