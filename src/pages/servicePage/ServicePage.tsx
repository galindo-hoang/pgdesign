import React, { useState, useEffect } from "react";
import ServicesSection from "../../components/ServicesSection";
import ConstructionServicesSection from "../../components/ConstructionServicesSection";
import ServiceProcessSection from "../../components/ServiceProcessSection";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ServicePageData } from "../../types/servicePageTypes";
import { fetchServicePageData } from "../../services/servicePageService";

const ServicePage: React.FC = () => {
  const [serviceData, setServiceData] = useState<ServicePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServiceData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchServicePageData();
        setServiceData(data);
      } catch (err) {
        console.error('Error loading service page data:', err);
        setError('Failed to load service page data');
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && !serviceData) {
    return (
      <div className="error-container">
        <h2>Error loading service page</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // Return early if no data available
  if (!serviceData) {
    return (
      <div className="error-container">
        <h2>No service data available</h2>
        <p>Unable to load service page content</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="service-page">
      <ServicesSection heroContent={serviceData.heroContent} services={serviceData.services}/>
      <ServiceProcessSection 
        processNumber={serviceData.processSection1.processNumber}
        title={serviceData.processSection1.title}
        description={serviceData.processSection1.description}
        note={serviceData.processSection1.note}
        imageUrl={serviceData.processSection1.imageUrl}
      />
      <ConstructionServicesSection 
        titleLeft={serviceData.constructionSection1.titleLeft}
        contentsLeft={serviceData.constructionSection1.contentsLeft}
        titleRight={serviceData.constructionSection1.titleRight}
        contentsRight={serviceData.constructionSection1.contentsRight}
      />
      <ServiceProcessSection 
        processNumber={serviceData.processSection2.processNumber}
        title={serviceData.processSection2.title}
        description={serviceData.processSection2.description}
        note={serviceData.processSection2.note}
        imageUrl={serviceData.processSection2.imageUrl}
      />
      <ConstructionServicesSection 
        titleLeft={serviceData.constructionSection2.titleLeft}
        contentsLeft={serviceData.constructionSection2.contentsLeft}
        titleRight={serviceData.constructionSection2.titleRight}
        contentsRight={serviceData.constructionSection2.contentsRight}
      />
      <ServiceProcessSection 
        processNumber={serviceData.processSection3.processNumber}
        title={serviceData.processSection3.title}
        description={serviceData.processSection3.description}
        note={serviceData.processSection3.note}
        imageUrl={serviceData.processSection3.imageUrl}
      />
      <ConstructionServicesSection 
        titleLeft={serviceData.constructionSection3.titleLeft}
        contentsLeft={serviceData.constructionSection3.contentsLeft}
        titleRight={serviceData.constructionSection3.titleRight}
        contentsRight={serviceData.constructionSection3.contentsRight}
      />
      <ServiceProcessSection 
        processNumber={serviceData.processSection4.processNumber}
        title={serviceData.processSection4.title}
        description={serviceData.processSection4.description}
        note={serviceData.processSection4.note}
        imageUrl={serviceData.processSection4.imageUrl}
      />
      <ConstructionServicesSection 
        titleLeft={serviceData.constructionSection4.titleLeft}
        contentsLeft={serviceData.constructionSection4.contentsLeft}
        titleRight={serviceData.constructionSection4.titleRight}
        contentsRight={serviceData.constructionSection4.contentsRight}
      />
    </div>
  );
};

export default ServicePage;
