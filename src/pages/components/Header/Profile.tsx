import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Profile() {
  return (
   <Flex align="center">
   <Box mr="4" textAlign="right">
       <Text>Arthur Moreira</Text>
       <Text
           color="gray.300" fontSize="small"
       >
           arthurmoreiradev@gmail.com
       </Text>
   </Box>
       <Avatar 
           size="md"
           name="Arthur Moreira"
           src="https://github.com/ArthurMCS.png"
       />
</Flex>
  )
}
