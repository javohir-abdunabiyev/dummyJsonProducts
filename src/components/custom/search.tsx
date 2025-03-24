import { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface SearchProps {
    products: any;
    setFilteredProducts: (filtered: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ products, setFilteredProducts }) => {

    const [search, setSearch] = useState<string>('');
    useEffect(() => {
        const filtered = products.filter((product: any) => {
            return product.title.toLowerCase().includes(search.toLowerCase().trim())
        })
        setFilteredProducts(filtered);
    }, [search, products, setFilteredProducts]);

    return (
        <>
            <div>
                <center>
                    <h1 className="text-[45px] font-bold mb-[10px] mt-[20px]">Search Product</h1>
                    <Input
                        className="w-[300px] h-[50px] mb-[20px]"
                        placeholder="Search"
                        name="search"
                        onKeyUp={(e: any) => setSearch(e.target.value)}
                    />
                </center>
            </div>
        </>
    );
}


export default Search;