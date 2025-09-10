import db from "../config/database";
import { CapabilitiesData } from "../types/profilePageTypes";

const TABLE = "profile_capabilities";

const ProfileCapabilitiesModel = {
  async getActive(): Promise<CapabilitiesData> {
    const row = await db(TABLE)
      .where({ is_active: true })
      .orderBy("updated_at", "desc")
      .first();
    if (!row) {
      return {
        title: "NĂNG LỰC",
        companyName: "PG DESIGN",
        serviceLine: "THIẾT KẾ & THI CÔNG TRỌN GÓI",
        description: "",
        capabilities: [],
        images: { mainImage: "", sideImages: [] },
        benefitsTitle: "",
      };
    }
    return this.rowToData(row);
  },

  async upsert(data: CapabilitiesData): Promise<CapabilitiesData> {
    await db.transaction(async (trx) => {
      await trx(TABLE).del();
      await trx(TABLE).insert({
        title: data.title,
        company_name: data.companyName,
        service_line: data.serviceLine,
        description: data.description,
        capabilities: JSON.stringify(data.capabilities || []),
        main_image: data.images?.mainImage || "",
        side_images: JSON.stringify(data.images?.sideImages || []),
        benefits_title: data.benefitsTitle || "",
        is_active: true,
        created_at: db.fn.now(),
        updated_at: db.fn.now(),
      });
    });
    const row = await db(TABLE)
      .where({ is_active: true })
      .orderBy("updated_at", "desc")
      .first();
    return this.rowToData(row);
  },

  rowToData(row: any): CapabilitiesData {
    return {
      id: row.id,
      title: row.title,
      companyName: row.company_name,
      serviceLine: row.service_line,
      description: row.description,
      capabilities: Array.isArray(row.capabilities)
        ? row.capabilities
        : row.capabilities
        ? JSON.parse(row.capabilities)
        : [],
      images: {
        mainImage: row.main_image,
        sideImages: Array.isArray(row.side_images)
          ? row.side_images
          : row.side_images
          ? JSON.parse(row.side_images)
          : [],
      },
      benefitsTitle: row.benefits_title,
      is_active: row.is_active,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  },
};

export default ProfileCapabilitiesModel;
