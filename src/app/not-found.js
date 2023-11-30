import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <Box minH="100vh" bg="white">
      <Box display="flex" flexDir="column" alignItems="center" pt={20}>
        <Text
          color="red.500"
          fontSize="201px"
          fontWeight="900"
          textShadow="4px 4px 0 #fff, 6px 6px 0 #11142d"
          lineHeight="210px"
        >
          404
        </Text>
        <Text my={5}>PAGE NOT FOUND!</Text>
        <Text color="gray.500">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</Text>
        <Link href="/">
          <Button mt={6} borderRadius="3xl" colorScheme={"red"}>
            Back to Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
