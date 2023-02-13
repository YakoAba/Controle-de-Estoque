export interface CatalogoIfoodInterface {
    catalogId: String;
    context: Array<String>;
    status: String;
    modifiedAt : Date;
    groupId: String;
}
  // CategoriasIfoodInterface: representa o resultado da API, incluindo informações de sucesso da API e uma lista de categorias.
export interface CatalogoDataApiIfood {
    success: boolean;
    catalogo?: Array<CatalogoIfoodInterface>;
}

// GridCategoriasProps: representa as propriedades que são passadas para o componente GridCategorias, incluindo a resposta da API e se os dados estão sendo carregados.
export interface GridCatalogoProps {
    data: CatalogoDataApiIfood;
    isLoading: boolean;
}