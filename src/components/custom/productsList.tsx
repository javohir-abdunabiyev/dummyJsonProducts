import { ReloadCTX } from "@/contexts/reload";
import { useContext, useEffect, useState } from "react";
import Aside from "./aside";
import { Button } from "../ui/button";
interface ProductProps { }

const ProductsList: React.FC<ProductProps> = () => {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useContext(ReloadCTX);

    useEffect(() => {
        fetch(import.meta.env.VITE_PUBLIC_API + '/products?limit=30')
            .then(res => res.json())
            .then(res => {
                setProducts(res.products)
            })
    }, [reload]);


    const handleClick = (id: number) => {
        setSelectedProductId(id);
    };

    const handleReload = () => {
        setReload((prev: boolean) => !prev);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-2 ">
                {products.map((product: any) => (
                    <div onClick={() => { handleClick(product.id) }} className="w-full cursor-pointer h-[530px] shadow-lg p-[20px] border-[#d8d6d6] border-[1px] rounded-[12px]" key={product.id}>
                        <div>
                            <img draggable={false} className="h-[200px] w-full mb-[60px]" src={product.thumbnail} alt="" />
                            <h1 className="font-bold text-[17px] mb-[10px]">{product.title}</h1>
                            <p className="mb-[15px] text-[15px] md:text-[12px] sm:text-[12px]">{product.description}</p>
                            <p className="font-bold text-[20px]">{product.price}$</p>
                        </div>
                    </div>
                ))
                }

                <Button onClick={() => handleReload} className="w-[70px] h-[70px] rounded-[50%] fixed bottom-[20px] right-[20px]">Обновить</Button>

            </div>
            {selectedProductId && (
                <Aside id={selectedProductId} />
            )}
        </>
    );

}

export default ProductsList;