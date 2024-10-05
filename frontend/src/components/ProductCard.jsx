import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';

const ProductCard = ({ product }) => {
    const textColour = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    return (
        <Box bg={bg} rounded={"lg"} shadow={"lg"} overflow={"hidden"} transition={"all .3s"} >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>{ product.name }</Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColour} >{ product.price }</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}  colorScheme={"blue"} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme={"red"} />
                </HStack>
            </Box>
        </Box>
    );
}

export default ProductCard;