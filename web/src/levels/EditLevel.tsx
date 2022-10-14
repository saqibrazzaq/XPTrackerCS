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
import { LevelUpdateDto } from "../dtos/level";
import { LevelApi } from "../apis/levelApi";

const EditLevel = () => {
  const params = useParams();
  const levelId = params.levelId;
  const updateText = levelId ? "Update Level" : "Create Level";
  const [level, setLevel] =
    useState<LevelUpdateDto>(new LevelUpdateDto());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadLevel();
  }, [levelId]);

  const loadLevel = () => {
    if (levelId) {
      LevelApi.get(levelId).then(res => {
        setLevel(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(100),
    minExp: Yup.number().min(0),
    maxExp: Yup.number().min(0),
  });

  const submitForm = (values: LevelUpdateDto) => {
    // console.log(values);
    if (levelId) {
      updateLevel(values);
    } else {
      createLevel(values);
    }
  };

  const updateLevel = (values: LevelUpdateDto) => {
    LevelApi.update(levelId, values).then(res => {
      toast({
        title: "Success",
        description: "Level updated successfully.",
        status: "success",
        position: "top-right",
      });
    });
    navigate("/levels")
  };

  const createLevel = (values: LevelUpdateDto) => {
    LevelApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Level created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/parts/update/" + res.partId)
      navigate("/levels")
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={level}
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
              <FormControl isInvalid={!!errors.minExp && touched.minExp}>
                <FormLabel htmlFor="minExp">Min Experience</FormLabel>
                <Field as={Input} id="minExp" name="minExp" type="text" />
                <FormErrorMessage>{errors.minExp}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.maxExp && touched.maxExp}>
                <FormLabel htmlFor="maxExp">Max Experience</FormLabel>
                <Field as={Input} id="maxExp" name="maxExp" type="text" />
                <FormErrorMessage>{errors.maxExp}</FormErrorMessage>
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
          to={"/levels"}
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

export default EditLevel