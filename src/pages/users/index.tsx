import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Th, Thead, Tr, Tbody, Td, Text, useBreakpointValue, Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { useQuery } from 'react-query'

import Header from '../../components/Header'
import Paginations from '../../components/Pagination'
import Sidebar from '../../components/Sidebar'

export default function UserList() {

  const {data, isLoading, error} = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    const users = data.users.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }))

    return users;
  }, {staleTime: 1000 * 10});

  console.log(isLoading);
  

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
   <Box>
        <Header />

        <Flex 
            w="100%"
            my="6"
            maxWidth={1480}
            mx="auto"
            px="6"
            minW={460}
            overflowX="auto"
        >
            <Sidebar />

            <Box
                flex="1"
                borderRadius={8}
                bg="gray.800"
                p={["5", "8"]}
            >
                <Flex 
                    mb="8" 
                    justify="space-between"
                >
                    <Heading size="lg" fontWeight="normal" >Usuários</Heading>

                   <Link href="/users/create" passHref>
                    <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} fontSize="16" />}                        
                        >
                            Criar novo
                        </Button>
                   </Link>

                </Flex>

                {
                    isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>    
                    ) : (
                        <>
                            <Table
                                colorScheme="whiteAlpha"
                            >
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" width="8" >
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>
                                            Usuário
                                        </Th>
                                        {isWideVersion && (<Th>Data de cadastro</Th>)}
                                        <Th width="8">
                                        </Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.map(user => (
                                        <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>

                                            <Td>
                                                <Text fontWeight="bold">{user.name}</Text>
                                                <Text fontSize="sm" color="gray.300" >{user.email}</Text>
                                            </Td>

                                            {isWideVersion && <Td>{user.createdAt}</Td>}

                                            <Td>
                                                {isWideVersion && (
                                                    <Button
                                                        as="a"
                                                        size="sm"
                                                        fontSize="sm"
                                                        colorScheme="purple"
                                                        leftIcon={<Icon as={RiPencilLine}  fontSize="20" />}                        
                                                    >
                                                        Editar
                                                    </Button>
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            <Paginations />  
                        </>
                    ) 
                }
            </Box>
        </Flex>
   </Box>
  )
}
