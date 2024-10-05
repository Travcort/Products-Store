import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

    const { fetchProducts, products } = useProductStore();
    
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    

    return (
        <Container maxW={'container.xl'} py={12}>
            <VStack spacing={8}>

                {
                    products.length === null && (
                        <Text fontSize={'xl'} textAlign={'center'} fontWeight={"bold"} color={"gray.500"}>
                            No Products Found {" "}
                            <Link to={"/create"}>
                                <Text as={'span'} color={'blue.500'}>Create a Product</Text>
                            </Link>
                        </Text>
                    )
                }

                <Text textAlign={'center'} fontSize={"30"} fontWeight={"bold"}>
                    Current Products
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </SimpleGrid>

                
            </VStack>
        </Container>
    );
};

export default HomePage;