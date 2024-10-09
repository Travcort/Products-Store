import { Box, Heading, HStack, IconButton, Image, Input, Modal, useDisclosure, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue, useToast, VStack, ModalFooter, Button, useStatStyles } from "@chakra-ui/react";
import { EditIcon, DeleteIcon  } from '@chakra-ui/icons';
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColour = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteProduct, updateProduct } = useProductStore();
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

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
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
    }

    return (
        <Box bg={bg} rounded={"lg"} shadow={"lg"} overflow={"hidden"} transition={"all .3s"} >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>{ product.name }</Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} mb={4} color={textColour} >{ product.price }</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme={"blue"} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"} />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name = "name"
                                value={updatedProduct.name}
                                onChange={ (e => setUpdatedProduct({...updateProduct, name: e.target.value})) }
                            />
                            <Input
                                placeholder="Price"
                                name = "price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={ (e => setUpdatedProduct({...updateProduct, price: e.target.value})) }
                            />
                            <Input
                                placeholder="Image URl"
                                name = "image"
                                value={updatedProduct.image}
                                onChange={ (e => setUpdatedProduct({...updateProduct, image: e.target.value})) }
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={4} colorScheme={"blue"} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        <Button colorScheme={"red"} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;