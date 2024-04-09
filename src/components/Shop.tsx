import { Filters } from './Filters';
import { ProductList } from './ProductList';
import { ShoppingCart } from './ShoppingCart';

export const Shop = () => {
    return (
        <div>
            <h1>Shop</h1>
            <Filters />
            <ProductList />
            <ShoppingCart />
        </div>
    );
};