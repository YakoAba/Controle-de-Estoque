
export function parseFloatToRealBrasil( val: number): string {
    return val.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL"
    })
};