import db from "../config/database";
import {
  ConstructionProcessData,
  ConstructionProcessSection,
} from "../types/profilePageTypes";

const TABLE = "profile_construction_process_sections";

const ProfileConstructionProcessModel = {
  async getActive(): Promise<ConstructionProcessData> {
    const rows = await db(TABLE)
      .where({ is_active: true })
      .orderBy([
        { column: "display_order", order: "asc" },
        { column: "id", order: "asc" },
      ]);
    const sections: ConstructionProcessSection[] = rows.map(this.rowToSection);
    return { sections };
  },

  async replaceAll(
    data: ConstructionProcessData
  ): Promise<ConstructionProcessData> {
    await db.transaction(async (trx) => {
      await trx(TABLE).del();
      for (let i = 0; i < (data.sections || []).length; i++) {
        const s = data.sections[i];
        if (!s) continue;
        await trx(TABLE).insert({
          title: s.title,
          description: s.description,
          images: JSON.stringify(s.images || []),
          layout_type: s.layoutType,
          display_order: i,
          is_active: true,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        });
      }
    });
    return this.getActive();
  },

  rowToSection(row: any): ConstructionProcessSection {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      images: Array.isArray(row.images)
        ? row.images
        : row.images
        ? JSON.parse(row.images)
        : [],
      layoutType: row.layout_type,
      display_order: row.display_order,
      is_active: row.is_active,
    };
  },
};

export default ProfileConstructionProcessModel;
