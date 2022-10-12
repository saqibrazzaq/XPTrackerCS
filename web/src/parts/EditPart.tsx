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
import { PartUpdateDto } from "../dtos/part";
import { PartApi } from "../apis/partApi";

const EditPart = () => {
  const params = useParams();
  const partId = params.partId;
  const updateText = partId ? "Update Part" : "Create Part";
  const [part, setPartDto] =
    useState<PartUpdateDto>(new PartUpdateDto());
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadPart();
  }, [partId]);

  const loadPart = () => {
    if (partId) {
      PartApi.get(partId).then(res => {
        setPartDto(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(100),
  });

  const submitForm = (values: PartUpdateDto) => {
    // console.log(values);
    if (partId) {
      updatePart(values);
    } else {
      createPart(values);
    }
  };

  const updatePart = (values: PartUpdateDto) => {
    PartApi.update(partId, values).then(res => {
      toast({
        title: "Success",
        description: "Part updated successfully.",
        status: "success",
        position: "top-right",
      });
    });
  };

  const createPart = (values: PartUpdateDto) => {
    PartApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Part created successfully.",
        status: "success",
        position: "top-right",
      });
      navigate("/parts/update/" + res.partId)
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={part}
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
              <FormControl isInvalid={!!errors.sortOrder && touched.sortOrder}>
                <FormLabel htmlFor="sortOrder">Sort Order</FormLabel>
                <Field as={Input} id="sortOrder" name="sortOrder" type="text" />
                <FormErrorMessage>{errors.sortOrder}</FormErrorMessage>
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
          to={"/parts"}
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

export default EditPart