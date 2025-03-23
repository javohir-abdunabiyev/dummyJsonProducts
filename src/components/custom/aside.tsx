import { ReloadCTX } from "@/contexts/reload";
import { useContext, useEffect, useState } from "react";

interface AsideProps {
    id: number;
}

function Aside({ id }: AsideProps) {
    const [product, setProduct] = useState<any>(null);
    const [reload, setReload] = useContext(ReloadCTX);

    useEffect(() => {
        fetch(import.meta.env.VITE_PUBLIC_API + '/products/' + id)
            .then(res => res.json())
            .then(res => {
                setProduct(res);
            });
    }, [id, reload]);

    if (!product) {
        return null
    }

    return (
        <>
            <div className="sticky top-[20px] h-full max-w-[500px] p-[20px] shadow-lg border-[#d8d6d6] border-[1px] rounded-[12px]">
                <div>
                    <img draggable={false} className="h-[200px] w-full mb-[60px]" src={product.thumbnail} alt={product.title} />
                    <h1 className="font-bold text-[17px] mb-[10px]">{product.title}</h1>
                    <p className="mb-[15px] text-[15px]">Brand: <b>{product.brand}</b></p>
                    <p className="mb-[15px] text-[15px]">{product.description}</p>
                    <p className="mb-[15px] text-[15px]">Minimum Order: <b>{product.minimumOrderQuantity}</b></p>
                    <p className="mb-[15px] text-[15px] font-bold">Warranty: {product.warrantyInformation}</p>
                    <p className="mb-[15px] text-[15px] font-bold">Rating: {product.rating}</p>
                    <p className="font-bold text-[20px]">{product.price}$</p>
                </div>
            </div>
        </>
    );
}

export default Aside;
