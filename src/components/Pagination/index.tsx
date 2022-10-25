import { Button, HStack, Box } from '@chakra-ui/react'
import React from 'react'
import PaginationItem from './PaginationItem'

export default function Paginations() {
  return (
    <HStack mt="8" justify="space-between" align="center" spacing="6" >
        <Box>
            <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
        </Box>
        <HStack spacing="2">
            <PaginationItem number={1}  isCurrent />
            <PaginationItem number={2} />
            <PaginationItem number={3} />
            <PaginationItem number={4} />
            <PaginationItem number={5} />
        </HStack>
    </HStack>
  )
}
