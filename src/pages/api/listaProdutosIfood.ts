export default async function handler(req, res) {

   const productId = "d3bafd86-01f3-4999-8161-bdc0332a8f7d";
   const catalogId = "2f8f10f9-20ea-4634-9e09-1d74f04773a7";
   const merchantApi = "https://merchant-api.ifood.com.br/catalog/v1.0";
   const merchantId = "799b5203-981f-4b1b-96d0-b7122cc1a246";
  // const merchantUrl = `https://merchant-api.ifood.com.br/merchant/v1.0/merchants`;
   const categoyURL = `${merchantApi}/merchants/${merchantId}/catalogs/${catalogId}/categories`;
   const catalogIdUrl = `${merchantApi}/merchants/${merchantId}/catalogs`;
  // const inventoryURL = `${merchantApi}/merchants/${merchantId}/inventory/${productId}`;
  // const ProdutoById = `https://merchant-api.ifood.com.br/catalog/v1.0/merchants/799b5203-981f-4b1b-96d0-b7122cc1a246/product/d3bafd86-01f3-4999-8161-bdc0332a8f7d`;

  const catalogURL = `https://merchant-api.ifood.com.br/catalog/v1.0/merchants/${merchantId}/products?page=1&limit=100`;
  const tokenURL = "http://localhost:3000/api/token";
  try {
    const tokenResponse = await fetch(tokenURL);
    const { accessToken } = await tokenResponse.json();
    if (!accessToken) {
      return res.status(500).json({ message: "Could not fetch access token" });
    }

    const catalogDataResponse = await fetch(catalogURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/jso",
      },
    });

    const catalogData = await catalogDataResponse.json();
    const elements = await catalogData;
    res.status(200).json({success: true, produtos: elements});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}
