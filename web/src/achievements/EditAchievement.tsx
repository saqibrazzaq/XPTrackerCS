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
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { AchievementUpdateDto } from "../dtos/achievement";
import { AchievementApi } from "../apis/achievementApi";
import { PartApi } from "../apis/partApi";
import { PartResponseDto } from "../dtos/part";

const EditAchievement = () => {
  const params = useParams();
  const partId = params.partId;
  const achievementId = params.achievementId;
  const updateText = achievementId ? "Update Achievement" : "Create Achievement";
  const [achievement, setAchievementDto] =
    useState<AchievementUpdateDto>(new AchievementUpdateDto(partId));
  const [part, setPart] = useState<PartResponseDto>();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadAchievement();
  }, [achievementId]);

  useEffect(() => {
    loadPart();
  }, [partId]);

  const loadPart = () => {
    PartApi.get(partId).then(res => {
      setPart(res);
    })
  }

  

  const loadAchievement = () => {
    if (achievementId) {
      AchievementApi.get(achievementId).then(res => {
        setAchievementDto(res);
        // console.log(res);
      })
    }
  }

  // Formik validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").max(100),
    page: Yup.number(),
    xp: Yup.number(),
    partId: Yup.string().required(),
  });

  const submitForm = (values: AchievementUpdateDto) => {
    // console.log(values);
    if (achievementId) {
      updatePart(values);
    } else {
      createPart(values);
    }
  };

  const updatePart = (values: AchievementUpdateDto) => {
    AchievementApi.update(achievementId, values).then(res => {
      toast({
        title: "Success",
        description: "Achievement updated successfully.",
        status: "success",
        position: "top-right",
      });
    });
    navigate("/achievements/" + partId)
  };

  const createPart = (values: AchievementUpdateDto) => {
    AchievementApi.create(values).then(res => {
      toast({
        title: "Success",
        description: "Achievement created successfully.",
        status: "success",
        position: "top-right",
      });
      // navigate("/achievements/" + partId + "/update/" + res.achievementId)
      navigate("/achievements/" + partId)
    });
  }

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={achievement}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
            <FormControl>
                <FormLabel>Part: {part?.name}</FormLabel>
                
              </FormControl>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Field as={Input} id="name" name="name" type="text" />
                <Field as={Input} id="partId" name="partId" type="hidden" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.page && touched.page}>
                <FormLabel htmlFor="page">Page</FormLabel>
                <Field as={Input} id="page" name="page" type="text" />
                <FormErrorMessage>{errors.page}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.xp && touched.xp}>
                <FormLabel htmlFor="xp">Xp</FormLabel>
                <Field as={Input} id="xp" name="xp" type="text" />
                <FormErrorMessage>{errors.xp}</FormErrorMessage>
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
          to={"/achievements/" + partId}
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

export default EditAchievement