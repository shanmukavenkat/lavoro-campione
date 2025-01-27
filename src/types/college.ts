export interface College {
  id: string;
  name: string;
  location: string;
  naacRating: string;
  fees: {
    [key: string]: number; // course -> fee amount
  };
  courses: string[];
  branches: {
    [key: string]: {
      seats: number;
      duration: string;
      eligibility: string;
      description: string;
    };
  };
  placementStats: {
    year: number;
    studentsPlaced: number;
    averagePackage: number;
    maxPackage: number;
    topRecruiters: string[];
  }[];
  accommodation: {
    hostel: {
      available: boolean;
      fees: number;
      amenities: string[];
    };
    offCampus: {
      available: boolean;
      averageRent: number;
      options: string[];
    };
  };
  faculty: {
    totalCount: number;
    withPhd: number;
    withIndustryExp: number;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}