import { ReloadCTX } from "@/contexts/reload";
import { useContext, useEffect, useState } from "react";
import Aside from "./aside";
import { Button } from "../ui/button";
import Search from "./search";

interface ProductProps { }

const ProductsList: React.FC<ProductProps> = () => {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [reload, setReload] = useContext(ReloadCTX);

    useEffect(() => {
        fetch(import.meta.env.VITE_PUBLIC_API + '/products?limit=30')
            .then(res => res.json())
            .then(res => {
                setProducts(res.products);
                setFilteredProducts(res.products);
            });
    }, [reload]);

    const handleClick = (id: number) => {
        setSelectedProductId(id);
    };

    const handleReload = () => {
        setReload((prev: boolean) => !prev);
    };

    return (
        <>
            <div className="w-full">
                {
                    filteredProducts.length > 0 ? (
                        <div>
                            <Search products={products} setFilteredProducts={setFilteredProducts} />
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-2 ">
                                {filteredProducts.map((product: any) => (
                                    <div onClick={() => { handleClick(product.id) }} className="max-w-[350px] cursor-pointer h-[390px] shadow-lg p-[20px] border-[#d8d6d6] border-[1px] rounded-[12px] sm:h-[350px]" key={product.id}>
                                        <div>
                                            <img draggable={false} className="h-[200px] w-full mb-[60px] sm:h-[150px]" src={product.thumbnail} alt="" />
                                            <h1 className="font-bold text-[17px] mb-[10px] sm:text-[15px]">{product.title}</h1>
                                            <p className="font-bold text-[20px]">{product.price}$</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button onClick={handleReload} className="cursor-pointer w-[70px] h-[70px] rounded-[50%] fixed bottom-[20px] right-[20px]">Обновить</Button>
                        </div>
                    ) : (
                        <div className=" min-h-screen flex justify-center items-center">
                            <h1 className="font-bold text-4xl">Loading...</h1>
                        </div>

                    )
                }
            </div>

            {selectedProductId && <Aside id={selectedProductId} />}
        </>
    );
}

export default ProductsList;
