"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroModel = void 0;
const database_js_1 = __importDefault(require("../config/database.js"));
const BaseModel_js_1 = require("./BaseModel.js");
class HeroModel extends BaseModel_js_1.BaseModel {
    constructor() {
        super('hero_data');
        this.heroImagesModel = new BaseModel_js_1.BaseModel('hero_images');
    }
    async getHeroWithImages() {
        const hero = await this.findOneByCondition({ is_active: true });
        if (!hero) {
            return null;
        }
        const images = await (0, database_js_1.default)('hero_images')
            .select('*')
            .where({ hero_id: hero.id, is_active: true })
            .orderBy('display_order', 'asc');
        return {
            ...hero,
            images: images.map(img => img.image_url)
        };
    }
    async createHeroWithImages(heroData, imageUrls) {
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
            await (0, database_js_1.default)('hero_images').insert(imageInserts);
        }
        const result = await this.getHeroWithImages();
        if (!result) {
            throw new Error('Failed to create hero with images');
        }
        return result;
    }
    async updateHeroWithImages(id, heroData, imageUrls) {
        const updatedHero = await this.update(id, heroData);
        if (!updatedHero) {
            return null;
        }
        if (imageUrls !== undefined) {
            await (0, database_js_1.default)('hero_images').where({ hero_id: id }).update({ is_active: false });
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
                await (0, database_js_1.default)('hero_images').insert(imageInserts);
            }
        }
        return await this.getHeroWithImages();
    }
    async getHeroImages(heroId) {
        return await (0, database_js_1.default)('hero_images')
            .select('*')
            .where({ hero_id: heroId, is_active: true })
            .orderBy('display_order', 'asc');
    }
    async addHeroImage(heroId, imageData) {
        const maxOrder = await (0, database_js_1.default)('hero_images')
            .where({ hero_id: heroId, is_active: true })
            .max('display_order as max_order')
            .first();
        const displayOrder = (maxOrder?.max_order || 0) + 1;
        const [id] = await (0, database_js_1.default)('hero_images').insert({
            ...imageData,
            hero_id: heroId,
            display_order: displayOrder,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        });
        return await (0, database_js_1.default)('hero_images').where({ id }).first();
    }
    async removeHeroImage(heroId, imageId) {
        const result = await (0, database_js_1.default)('hero_images')
            .where({ id: imageId, hero_id: heroId })
            .update({ is_active: false, updated_at: new Date() });
        return result > 0;
    }
    async reorderHeroImages(heroId, imageOrder) {
        const promises = imageOrder.map((imageId, index) => {
            return (0, database_js_1.default)('hero_images')
                .where({ id: imageId, hero_id: heroId })
                .update({ display_order: index, updated_at: new Date() });
        });
        await Promise.all(promises);
        return true;
    }
}
exports.HeroModel = HeroModel;
exports.default = new HeroModel();
//# sourceMappingURL=HeroModel.js.map