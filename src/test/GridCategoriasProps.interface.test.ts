import { PriceInterface } from "../interfaces/Categorias.interface"

describe('PriceInterface', () => {
    
    it('Deve retornar 200 ao fazer GET em /items', async () => {
        const response = await fetch('http://localhost:3000/api/listaProdutosIfood');
        expect(response.status).toBe(200);
    });

    it('armazena o valor corretamente', () => {
        const price: PriceInterface = {
            value: 10,
            scalePrices: [{ scale: 1, price: 10 }, { scale: 5, price: 9 }],
        };

        expect(price.value).toBe(10);
    });

    it('armazena a lista de preços por escala corretamente', () => {
        const price: PriceInterface = {
            value: 10,
            scalePrices: [{ scale: 1, price: 10 }, { scale: 5, price: 9 }],
        };
        expect(price.scalePrices).toEqual([{ scale: 1, price: 10 }, { scale: 5, price: 9 }]);
    });

    it('verifica o tipo de dados da lista de preços por escala', () => {
        const price: PriceInterface = {
            value: 10,
            scalePrices: [{ scale: 1, price: 10 }, { scale: 5, price: 9 }],
        };

        expect(Array.isArray(price.scalePrices)).toBe(true);
        expect(price.scalePrices).toEqual(expect.arrayContaining([{ scale: 1, price: 10 }, { scale: 5, price: 9 }]));
    });
});
