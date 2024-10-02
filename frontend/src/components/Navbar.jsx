import {  PlusSquareIcon } from '@chakra-ui/icons';
import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container
            maxW={"1140px"}
            px={4} 
            bgColor={"blue.900"}
            borderRadius={"10px"}
        >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}
            >
                <Text
                    bgColor={"yellow.500"}
                    bgClip='text'
                    fontSize='3xl'
                    fontWeight='extrabold'
                >
                    <Link to={"/"}>Products Store 🛒</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <PlusSquareIcon />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FaMoon /> : <IoSunny />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
}

export default Navbar;