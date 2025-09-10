import db from "../config/database";
import {
  TechnicalAdvantagesData,
  TechnicalAdvantagePhase,
} from "../types/profilePageTypes";

const TABLE_MAIN = "profile_technical_advantages";
const TABLE_PHASES = "profile_technical_advantage_phases";

const ProfileTechnicalAdvantagesModel = {
  async getActive(): Promise<TechnicalAdvantagesData> {
    const main = await db(TABLE_MAIN)
      .where({ is_active: true })
      .orderBy("updated_at", "desc")
      .first();
    const phasesRows = await db(TABLE_PHASES)
      .where({ is_active: true })
      .orderBy([
        { column: "display_order", order: "asc" },
        { column: "id", order: "asc" },
      ]);

    return {
      mainTitle: main?.main_title || "ƯU ĐIỂM KỸ THUẬT",
      phases: phasesRows.map(this.rowToPhase),
    };
  },

  async replaceAll(
    data: TechnicalAdvantagesData
  ): Promise<TechnicalAdvantagesData> {
    await db.transaction(async (trx) => {
      // upsert main (delete all then insert one)
      await trx(TABLE_MAIN).del();
      await trx(TABLE_MAIN).insert({
        main_title: data.mainTitle,
        is_active: true,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      });
      // replace phases
      await trx(TABLE_PHASES).del();
      for (let i = 0; i < (data.phases || []).length; i++) {
        const p = data.phases[i];
        if (!p) continue;
        await trx(TABLE_PHASES).insert({
          title: p.title,
          description: p.description,
          images: JSON.stringify(p.images || []),
          layout_type: p.layoutType,
          display_order: i,
          is_active: true,
          created_at: db.fn.now(),
          updated_at: db.fn.now(),
        });
      }
    });
    return this.getActive();
  },

  rowToPhase(row: any): TechnicalAdvantagePhase {
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

export default ProfileTechnicalAdvantagesModel;
