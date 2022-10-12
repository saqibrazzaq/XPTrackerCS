import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { PlayerUpdateDto } from "../dtos/Player";
import { PlayerApi } from "../apis/playerApi";

const EditPlayer = () => {
  const params = useParams();
  const playerId = params.playerId;
  const updateText = playerId ? "Update Player" : "Create Player";
  const [playerDto, setPlayerDto] =
    useState<PlayerUpdateDto>(new PlayerUpdateDto());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadPlayer();
  }, [playerId]);

  const loadPlayer = () => {
    if (playerId) {
      PlayerApi.get(playerId).then(res => {
        setPlayerDto(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(100),
  });

  const submitForm = (values: PlayerUpdateDto) => {
    // console.log(values);
    if (playerId) {
      updatePlayer(values);
    } else {
      createPlayer(values);
    }
  };

  const updatePlayer = (values: PlayerUpdateDto) => {
    PlayerApi.update(playerId, values).then(res => {
      toast({
        title: "Success",
        description: "Player updated successfully.",
        status: "success",
        position: "top-right",
      });
    });
  };

  const createPlayer = (values: PlayerUpdateDto) => {
    PlayerApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Player created successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/players/update/" + res.playerId)
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={playerDto}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <Stack direction={"row"} spacing={6}>
                <Button type="submit" colorScheme={"blue"}>{updateText}</Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link
          ml={2}
          as={RouteLink}
          to={"/players"}
        >
          <Button colorScheme={"gray"}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
}

export default EditPlayer