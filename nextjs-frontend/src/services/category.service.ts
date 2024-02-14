import { Category } from "@/models";

export class CategoryService {

  // Get all Categories
  async getCategories() : Promise<Category[]> {
    const response = await fetch(`${process.env.CATALOG_API_URL}/category`, { // Cache time
      next: {
        revalidate: 10,
      }
    });
    return response.json();
  }
}