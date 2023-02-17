import { NextApiRequest, NextApiResponse } from "next";
import { TokenApiResponseIfoodClass } from "../../classes/Token.class";
import { catalogId, catalogURL, merchantId } from "../../config/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {

  const productId = "d3bafd86-01f3-4999-8161-bdc0332a8f7d";

  const merchantApi = "https://merchant-api.ifood.com.br/catalog/v1.0";

  // const merchantUrl = `https://merchant-api.ifood.com.br/merchant/v1.0/merchants`;
  const categoyURL = `${merchantApi}/merchants/${merchantId}/catalogs/${catalogId}/categories`;
  const catalogIdUrl = `${merchantApi}/merchants/${merchantId}/catalogs`;
  // const inventoryURL = `${merchantApi}/merchants/${merchantId}/inventory/${productId}`;
  // const ProdutoById = `https://merchant-api.ifood.com.br/catalog/v1.0/merchants/799b5203-981f-4b1b-96d0-b7122cc1a246/product/d3bafd86-01f3-4999-8161-bdc0332a8f7d`;
  const pagamemntos = `https://merchant-api.ifood.com.br/financial/v2.0/merchants/${merchantId}/payments`;

  try {

    const { getHeaders, temTokenAtivo } = await TokenApiResponseIfoodClass.createInstance();

    if (!temTokenAtivo) {
      return res.status(500).json({ success: false, elements: null });
    }

    const catalogDataResponse = await fetch(catalogURL, { headers: getHeaders() });

    const categorias = await catalogDataResponse.json();


    res.status(200).json({ success: true, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, categorias: null });
  }
}
