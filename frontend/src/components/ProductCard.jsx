import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const textColour = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct } = useProductStore();
    const toast = useToast();
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                isClosable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                isClosable: true,
            });
        }
    };

    return (
        <Box bg={bg} rounded={"lg"} shadow={"lg"} overflow={"hidden"} transition={"all .3s"} >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>{ product.name }</Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColour} >{ product.price }</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}  colorScheme={"blue"} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"} />
                </HStack>
            </Box>
        </Box>
    );
}

export default ProductCard;