import { Product } from "@/models";

export class ProductService {

  // Get all products
  async getProducts({ search }: { search: string | undefined }): Promise<Product[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/product`, { // Cache time
      next: {
        revalidate: 10,
      }
    });
    let data = await response.json();
    data = !data ? [] : data;

    if(search) {
      return data.filter((product: Product) => {
        return product.name.toLowerCase().includes(search.toLowerCase())
      });
    }

    return data;
  }

  // Get Product by id
  async getProduct(productId: string): Promise<Product> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/product/${productId}`, { // Cache time
      next: {
        revalidate: 10,
      }
    });
    return response.json();
  }
}