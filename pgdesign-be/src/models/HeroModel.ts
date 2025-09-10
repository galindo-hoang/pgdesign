import db from '../config/database';
import { BaseModel } from './BaseModel';
import { HeroData, HeroImage } from '../types/homePageTypes';

export class HeroModel extends BaseModel {
  private heroImagesModel: BaseModel;

  constructor() {
    super('hero_data');
    this.heroImagesModel = new BaseModel('hero_images');
  }

  async getHeroWithImages(): Promise<HeroData | null> {
    const hero = await this.findOneByCondition({ is_active: true });
    if (!hero) {
      return null;
    }

    const images = await db('hero_images')
      .select('*')
      .where({ hero_id: hero.id, is_active: true })
      .orderBy('display_order', 'asc');

    return {
      ...hero,
      images: images.map(img => img.image_url)
    };
  }

  async createHeroWithImages(heroData: any, imageUrls: string[]): Promise<HeroData> {
    const hero = await this.create(heroData);
    
    if (imageUrls && imageUrls.length > 0) {
      const imageInserts = imageUrls.map((url, index) => ({
        hero_id: hero.id,
        image_url: url,
        image_alt: `Hero image ${index + 1}`,
        display_order: index,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }));

      await db('hero_images').insert(imageInserts);
    }

    const result = await this.getHeroWithImages();
    if (!result) {
      throw new Error('Failed to create hero with images');
    }
    return result;
  }

  async updateHeroWithImages(id: number, heroData: any, imageUrls?: string[]): Promise<HeroData | null> {
    const updatedHero = await this.update(id, heroData);
    if (!updatedHero) {
      return null;
    }

    if (imageUrls !== undefined) {
      // Remove existing images
      await db('hero_images').where({ hero_id: id }).update({ is_active: false });
      
      // Add new images
      if (imageUrls.length > 0) {
        const imageInserts = imageUrls.map((url, index) => ({
          hero_id: id,
          image_url: url,
          image_alt: `Hero image ${index + 1}`,
          display_order: index,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }));

        await db('hero_images').insert(imageInserts);
      }
    }

    return await this.getHeroWithImages();
  }

  async getHeroImages(heroId: number): Promise<HeroImage[]> {
    return await db('hero_images')
      .select('*')
      .where({ hero_id: heroId, is_active: true })
      .orderBy('display_order', 'asc');
  }

  async addHeroImage(heroId: number, imageData: any): Promise<HeroImage> {
    const maxOrder = await db('hero_images')
      .where({ hero_id: heroId, is_active: true })
      .max('display_order as max_order')
      .first();

    const displayOrder = (maxOrder?.max_order || 0) + 1;
    
    const [id] = await db('hero_images').insert({
      ...imageData,
      hero_id: heroId,
      display_order: displayOrder,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    });

    return await db('hero_images').where({ id }).first();
  }

  async removeHeroImage(heroId: number, imageId: number): Promise<boolean> {
    const result = await db('hero_images')
      .where({ id: imageId, hero_id: heroId })
      .update({ is_active: false, updated_at: new Date() });
    
    return result > 0;
  }

  async reorderHeroImages(heroId: number, imageOrder: number[]): Promise<boolean> {
    const promises = imageOrder.map((imageId, index) => {
      return db('hero_images')
        .where({ id: imageId, hero_id: heroId })
        .update({ display_order: index, updated_at: new Date() });
    });

    await Promise.all(promises);
    return true;
  }
}

export default new HeroModel(); 