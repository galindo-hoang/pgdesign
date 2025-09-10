// src/controllers/ServicePageController.ts
import { Request, Response } from 'express';
import { asyncHandler, createError } from '../middleware/errorHandler';
import servicePageHeroModel from '../models/ServicePageHeroModel';
import servicePageServicesModel from '../models/ServicePageServicesModel';
import servicePageProcessSectionsModel from '../models/ServicePageProcessSectionsModel';
import servicePageConstructionSectionsModel from '../models/ServicePageConstructionSectionsModel';
import { 
  ServicePageData, 
  HeroContent, 
  ServiceItem, 
  ServiceProcessData, 
  ConstructionServiceData,
  ApiResponse 
} from '../types/servicePageTypes';

export class ServicePageController {
  // ==============================================
  // MAIN ENDPOINT - Get All Service Page Data
  // ==============================================
  
  public getServicePageData = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const [
        heroContent,
        services,
        processSections,
        constructionSections
      ] = await Promise.all([
        servicePageHeroModel.getActiveHero(),
        servicePageServicesModel.getActiveServices(),
        servicePageProcessSectionsModel.getActiveProcessSections(),
        servicePageConstructionSectionsModel.getActiveConstructionSections()
      ]);

      // Transform database entities to frontend format
      const heroData: HeroContent = heroContent ? {
        mainTitle: heroContent.main_title,
        brandName: heroContent.brand_name,
        description: heroContent.description,
        heroImageUrl: heroContent.hero_image_url
      } : {
        mainTitle: "DỊCH VỤ",
        brandName: "PG DESIGN",
        description: "Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện.",
        heroImageUrl: undefined
      };

      const servicesData: ServiceItem[] = services.map(service => ({
        id: service.id,
        title: service.title,
        subtitle: service.subtitle,
        description: service.description
      }));

      // Transform process sections (1-4)
      const processSection1 = processSections.find(p => p.process_number === 1);
      const processSection2 = processSections.find(p => p.process_number === 2);
      const processSection3 = processSections.find(p => p.process_number === 3);
      const processSection4 = processSections.find(p => p.process_number === 4);

      // Transform construction sections (1-4)
      const constructionSection1 = constructionSections.find(c => c.section_number === 1);
      const constructionSection2 = constructionSections.find(c => c.section_number === 2);
      const constructionSection3 = constructionSections.find(c => c.section_number === 3);
      const constructionSection4 = constructionSections.find(c => c.section_number === 4);

      const servicePageData: ServicePageData = {
        heroContent: heroData,
        services: servicesData,
        processSection1: processSection1 ? {
          processNumber: processSection1.process_number,
          title: processSection1.title,
          description: processSection1.description,
          note: processSection1.note,
          imageUrl: processSection1.image_url
        } : this.getDefaultProcessSection(1),
        constructionSection1: constructionSection1 ? {
          titleLeft: constructionSection1.title_left,
          contentsLeft: constructionSection1.contents_left,
          titleRight: constructionSection1.title_right,
          contentsRight: constructionSection1.contents_right
        } : this.getDefaultConstructionSection(1),
        processSection2: processSection2 ? {
          processNumber: processSection2.process_number,
          title: processSection2.title,
          description: processSection2.description,
          note: processSection2.note,
          imageUrl: processSection2.image_url
        } : this.getDefaultProcessSection(2),
        constructionSection2: constructionSection2 ? {
          titleLeft: constructionSection2.title_left,
          contentsLeft: constructionSection2.contents_left,
          titleRight: constructionSection2.title_right,
          contentsRight: constructionSection2.contents_right
        } : this.getDefaultConstructionSection(2),
        processSection3: processSection3 ? {
          processNumber: processSection3.process_number,
          title: processSection3.title,
          description: processSection3.description,
          note: processSection3.note,
          imageUrl: processSection3.image_url
        } : this.getDefaultProcessSection(3),
        constructionSection3: constructionSection3 ? {
          titleLeft: constructionSection3.title_left,
          contentsLeft: constructionSection3.contents_left,
          titleRight: constructionSection3.title_right,
          contentsRight: constructionSection3.contents_right
        } : this.getDefaultConstructionSection(3),
        processSection4: processSection4 ? {
          processNumber: processSection4.process_number,
          title: processSection4.title,
          description: processSection4.description,
          note: processSection4.note,
          imageUrl: processSection4.image_url
        } : this.getDefaultProcessSection(4),
        constructionSection4: constructionSection4 ? {
          titleLeft: constructionSection4.title_left,
          contentsLeft: constructionSection4.contents_left,
          titleRight: constructionSection4.title_right,
          contentsRight: constructionSection4.contents_right
        } : this.getDefaultConstructionSection(4)
      };

      const response: ApiResponse<ServicePageData> = {
        success: true,
        message: 'Service page data retrieved successfully',
        data: servicePageData
      };

      console.log('DEBUG: servicePageData:', JSON.stringify(response));

      res.json(response);
    } catch (error) {
      console.error('Error fetching service page data:', error);
      throw createError('Failed to fetch service page data', 500);
    }
  });

  // ==============================================
  // HERO CONTENT ENDPOINTS
  // ==============================================

  public getHeroContent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const heroContent = await servicePageHeroModel.getActiveHero();
      
      const response: ApiResponse<typeof heroContent> = {
        success: true,
        message: 'Hero content retrieved successfully',
        data: heroContent
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching hero content:', error);
      throw createError('Failed to fetch hero content', 500);
    }
  });

  public createHeroContent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const heroContent = await servicePageHeroModel.create(req.body);
      
      const response: ApiResponse<typeof heroContent> = {
        success: true,
        message: 'Hero content created successfully',
        data: heroContent
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating hero content:', error);
      throw createError('Failed to create hero content', 500);
    }
  });

  public updateHeroContent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const heroContent = await servicePageHeroModel.update(id, req.body);
      
      const response: ApiResponse<typeof heroContent> = {
        success: true,
        message: 'Hero content updated successfully',
        data: heroContent
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating hero content:', error);
      throw createError('Failed to update hero content', 500);
    }
  });

  public deleteHeroContent = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const deleted = await servicePageHeroModel.delete(id);
      
      if (!deleted) {
        throw createError('Hero content not found', 404);
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Hero content deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting hero content:', error);
      throw createError('Failed to delete hero content', 500);
    }
  });

  // ==============================================
  // SERVICES ENDPOINTS
  // ==============================================

  public getServices = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      if (req.query.page || req.query.limit) {
        const result = await servicePageServicesModel.getPaginated(page, limit);
        
        const response = {
          success: true,
          message: 'Services retrieved successfully',
          data: result.services,
          pagination: {
            page,
            limit,
            total: result.total,
            totalPages: result.totalPages
          }
        };

        res.json(response);
      } else {
        const services = await servicePageServicesModel.getAll();
        
        const response: ApiResponse<typeof services> = {
          success: true,
          message: 'Services retrieved successfully',
          data: services
        };

        res.json(response);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      throw createError('Failed to fetch services', 500);
    }
  });

  public getServiceById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const service = await servicePageServicesModel.getById(id);
      
      if (!service) {
        throw createError('Service not found', 404);
      }

      const response: ApiResponse<typeof service> = {
        success: true,
        message: 'Service retrieved successfully',
        data: service
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching service:', error);
      throw createError('Failed to fetch service', 500);
    }
  });

  public createService = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const service = await servicePageServicesModel.create(req.body);
      
      const response: ApiResponse<typeof service> = {
        success: true,
        message: 'Service created successfully',
        data: service
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating service:', error);
      throw createError('Failed to create service', 500);
    }
  });

  public updateService = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const service = await servicePageServicesModel.update(id, req.body);
      
      const response: ApiResponse<typeof service> = {
        success: true,
        message: 'Service updated successfully',
        data: service
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating service:', error);
      throw createError('Failed to update service', 500);
    }
  });

  public deleteService = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id!);
      const deleted = await servicePageServicesModel.delete(id);
      
      if (!deleted) {
        throw createError('Service not found', 404);
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Service deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting service:', error);
      throw createError('Failed to delete service', 500);
    }
  });

  // ==============================================
  // PROCESS SECTIONS ENDPOINTS
  // ==============================================

  public getProcessSections = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const processSections = await servicePageProcessSectionsModel.getAll();
      
      const response: ApiResponse<typeof processSections> = {
        success: true,
        message: 'Process sections retrieved successfully',
        data: processSections
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching process sections:', error);
      throw createError('Failed to fetch process sections', 500);
    }
  });

  public getProcessSectionByNumber = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const processNumber = parseInt(req.params.number!);
      const processSection = await servicePageProcessSectionsModel.getByProcessNumber(processNumber);
      
      if (!processSection) {
        throw createError('Process section not found', 404);
      }

      const response: ApiResponse<typeof processSection> = {
        success: true,
        message: 'Process section retrieved successfully',
        data: processSection
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching process section:', error);
      throw createError('Failed to fetch process section', 500);
    }
  });

  public createProcessSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const processSection = await servicePageProcessSectionsModel.create(req.body);
      
      const response: ApiResponse<typeof processSection> = {
        success: true,
        message: 'Process section created successfully',
        data: processSection
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating process section:', error);
      throw createError('Failed to create process section', 500);
    }
  });

  public updateProcessSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const processNumber = parseInt(req.params.number!);
      const processSection = await servicePageProcessSectionsModel.updateByProcessNumber(processNumber, req.body);
      
      const response: ApiResponse<typeof processSection> = {
        success: true,
        message: 'Process section updated successfully',
        data: processSection
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating process section:', error);
      throw createError('Failed to update process section', 500);
    }
  });

  public deleteProcessSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const processNumber = parseInt(req.params.number!);
      const deleted = await servicePageProcessSectionsModel.deleteByProcessNumber(processNumber);
      
      if (!deleted) {
        throw createError('Process section not found', 404);
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Process section deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting process section:', error);
      throw createError('Failed to delete process section', 500);
    }
  });

  // ==============================================
  // CONSTRUCTION SECTIONS ENDPOINTS
  // ==============================================

  public getConstructionSections = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const constructionSections = await servicePageConstructionSectionsModel.getAll();
      
      const response: ApiResponse<typeof constructionSections> = {
        success: true,
        message: 'Construction sections retrieved successfully',
        data: constructionSections
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching construction sections:', error);
      throw createError('Failed to fetch construction sections', 500);
    }
  });

  public getConstructionSectionByNumber = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionNumber = parseInt(req.params.number!);
      const constructionSection = await servicePageConstructionSectionsModel.getBySectionNumber(sectionNumber);
      
      if (!constructionSection) {
        throw createError('Construction section not found', 404);
      }

      const response: ApiResponse<typeof constructionSection> = {
        success: true,
        message: 'Construction section retrieved successfully',
        data: constructionSection
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching construction section:', error);
      throw createError('Failed to fetch construction section', 500);
    }
  });

  public createConstructionSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const constructionSection = await servicePageConstructionSectionsModel.create(req.body);
      
      const response: ApiResponse<typeof constructionSection> = {
        success: true,
        message: 'Construction section created successfully',
        data: constructionSection
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating construction section:', error);
      throw createError('Failed to create construction section', 500);
    }
  });

  public updateConstructionSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionNumber = parseInt(req.params.number!);
      const constructionSection = await servicePageConstructionSectionsModel.updateBySectionNumber(sectionNumber, req.body);
      
      const response: ApiResponse<typeof constructionSection> = {
        success: true,
        message: 'Construction section updated successfully',
        data: constructionSection
      };

      res.json(response);
    } catch (error) {
      console.error('Error updating construction section:', error);
      throw createError('Failed to update construction section', 500);
    }
  });

  public deleteConstructionSection = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      const sectionNumber = parseInt(req.params.number!);
      const deleted = await servicePageConstructionSectionsModel.deleteBySectionNumber(sectionNumber);
      
      if (!deleted) {
        throw createError('Construction section not found', 404);
      }

      const response: ApiResponse<null> = {
        success: true,
        message: 'Construction section deleted successfully'
      };

      res.json(response);
    } catch (error) {
      console.error('Error deleting construction section:', error);
      throw createError('Failed to delete construction section', 500);
    }
  });

  // ==============================================
  // HELPER METHODS
  // ==============================================

  private getDefaultProcessSection(processNumber: number): ServiceProcessData {
    const defaults = {
      1: {
        processNumber: 1,
        title: ["THI CÔNG PHẦN THÔ HOẶC", "TRỌN GÓI HOÀN THIỆN"],
        description: "PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình.",
        note: "Không bao gồm thi công đồ nội thất rời",
        imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.png"
      },
      2: {
        processNumber: 2,
        title: ["THI CÔNG NỘI THẤT"],
        description: "PG Design đồng hành cùng bạn từ khâu hoàn thiện công trình, thi công nội thất đến cải tạo lại toàn bộ không gian sống.",
        note: "",
        imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.png"
      },
      3: {
        processNumber: 3,
        title: ["THIẾT KẾ KIẾN TRÚC & NỘI THẤT"],
        description: "Từ khái niệm không gian đến bản vẽ chi tiết, PG Design kiến tạo nên những thiết kế vừa chuẩn công năng, vừa đậm chất thẩm mỹ.",
        note: "",
        imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.png"
      },
      4: {
        processNumber: 4,
        title: ["CẢI TẠO SỬA CHỮA HOẶC", "DỰ ÁN ĐÃ CÓ BẢN VẼ"],
        description: "PG Design nhận thi công các công trình đã có bản vẽ kiến trúc hoặc nội thất.",
        note: "",
        imageUrl: "http://localhost:9000/pgdesign-assets/images/diary-image-7.png"
      }
    };

    return defaults[processNumber as keyof typeof defaults] || defaults[1];
  }

  private getDefaultConstructionSection(sectionNumber: number): ConstructionServiceData {
    const defaults = {
      1: {
        titleLeft: "THI CÔNG PHẦN THÔ",
        contentsLeft: [
          "Đào móng, thi công móng - thi công bể tự hoại",
          "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang",
          "Thi công tường bao che, tường ngăn nhà",
          "Lắp đặt hệ thống điện, nước âm tường, sàn",
          "Thi công chống thấm, cán nền sàn, tô tường"
        ],
        titleRight: "TRỌN GÓI HOÀN THIỆN",
        contentsRight: [
          "Lát gạch nền, tường, khu vực vệ sinh",
          "Sơn nước trong - ngoài nhà",
          "Lắp trần thạch cao, trang trí phào chỉ (nếu có)",
          "Lắp thiết bị vệ sinh",
          "Lắp hệ thống điện nổi, đèn chiếu sáng",
          "Lắp đặt cửa chính, cửa sổ, lan can"
        ]
      },
      2: {
        titleLeft: "THI CÔNG HOÀN THIỆN",
        contentsLeft: [
          "Ốp lát gạch nền, tường WC, bếp, ban công",
          "Sơn nước hoàn thiện trong - ngoài",
          "Thi công trần thạch cao, phào chỉ (nếu có)",
          "Lắp thiết bị điện, đèn chiếu sáng",
          "Lắp đặt thiết bị vệ sinh",
          "Vệ sinh tổng thể trước khi bàn giao"
        ],
        titleRight: "THI CÔNG NỘI THẤT",
        contentsRight: [
          "Gia công, sản xuất và lắp đặt nội thất theo bản vẽ thiết kế",
          "Trình mẫu vật tư và nghiệm thu vật liệu đầu vào trước khi sản xuất",
          "Vật liệu nội thất từ gỗ công nghiệp (An Cường,...) gỗ tự nhiên (gỗ óc chó...) hoặc gỗ nhựa (Picomat, WPB...)",
          "Cung cấp lắp đặt phụ kiện tủ từ cơ bản tới cao cấp",
          "Cung cấp và lắp đặt thiết bị bếp (máy rửa chén, bếp từ, lò vi sóng...)",
          "Cung cấp và lắp đặt thiết bị thông minh (nếu có)",
          "Nhận thi công nội thất từ thiết kế của khách hàng"
        ]
      },
      3: {
        titleLeft: "THIẾT KẾ KIẾN TRÚC",
        contentsLeft: [
          "Bản vẽ cơ sở kiến trúc",
          "Phối cảnh thiết kế hoàn chỉnh",
          "Bộ hồ sơ kiến trúc chi tiết",
          "Bộ hồ sơ kết cấu",
          "Hồ sơ kỹ thuật điện - nước"
        ],
        titleRight: "THIẾT KẾ NỘI THẤT",
        contentsRight: [
          "Định hướng không gian tổng thể",
          "Phối cảnh nội thất hoàn chỉnh",
          "Mặt bằng & chi tiết kỹ thuật",
          "Thiết kế chi tiết tiện ích phụ",
          "Hồ sơ kỹ thuật điện - công nghệ"
        ]
      },
      4: {
        titleLeft: "CẢI TẠO SỬA CHỮA",
        contentsLeft: [
          "Khảo sát thực tế hiện trạng công trình",
          "Đánh giá kết cấu, hệ thống điện nước, vật liệu, công năng",
          "Đề xuất phương án cải tạo phù hợp nhu cầu - thẩm mỹ - ngân sách",
          "Lập hồ sơ thiết kế cải tạo và dự toán công trình",
          "Thi công từ phần thô đến hoàn thiện",
          "Đảm bảo tiến độ, giám sát kỹ thuật và an toàn công trình trong suốt quá trình thi công"
        ],
        titleRight: "DỰ ÁN ĐÃ CÓ BẢN VẼ",
        contentsRight: [
          "Tiếp nhận, rà soát và phân tích bản vẽ thiết kế",
          "Tư vấn vật tư, phương án thi công phù hợp thực tế",
          "Bóc tách khối lượng - lập báo giá chi tiết",
          "Trình mẫu vật tư trước khi thi công",
          "Triển khai thi công theo đúng hồ sơ thiết kế",
          "Nghiệm thu từng phần & tổng thể công trình với CĐT trước khi bản giao",
          "Giám sát chặt chẽ - bảo hành công trình sau hoàn thiện"
        ]
      }
    };

    return defaults[sectionNumber as keyof typeof defaults] || defaults[1];
  }
}

export default new ServicePageController(); 