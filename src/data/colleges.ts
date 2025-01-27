import { College } from '../types/college';

export const colleges: College[] = [
  {
    id: "1",
    name: "Andhra University",
    location: "Visakhapatnam",
    naacRating: "A+",
    fees: {
      "B.Tech": 45000,
      "M.Tech": 55000,
      "MBA": 65000
    },
    courses: ["B.Tech", "M.Tech", "MBA", "MCA", "Ph.D"],
    branches: {
      "CSE": {
        seats: 180,
        duration: "4 years",
        eligibility: "10+2 with PCM, minimum 60% aggregate",
        description: "Computer Science and Engineering program focusing on software development, algorithms, and computer systems."
      },
      "ECE": {
        seats: 120,
        duration: "4 years",
        eligibility: "10+2 with PCM, minimum 60% aggregate",
        description: "Electronics and Communication Engineering program covering electronic systems, communication networks, and signal processing."
      },
      "Mechanical": {
        seats: 120,
        duration: "4 years",
        eligibility: "10+2 with PCM, minimum 60% aggregate",
        description: "Mechanical Engineering program covering design, manufacturing, and thermal systems."
      }
    },
    placementStats: [
      {
        year: 2023,
        studentsPlaced: 850,
        averagePackage: 6.5,
        maxPackage: 45,
        topRecruiters: ["Microsoft", "Amazon", "TCS", "Infosys", "Wipro"]
      }
    ],
    accommodation: {
      hostel: {
        available: true,
        fees: 45000,
        amenities: ["24/7 WiFi", "Gym", "Mess", "Library", "Medical Facility"]
      },
      offCampus: {
        available: true,
        averageRent: 8000,
        options: ["PG Accommodations", "Shared Apartments", "Private Hostels"]
      }
    },
    faculty: {
      totalCount: 450,
      withPhd: 280,
      withIndustryExp: 150
    }
  },
  {
    id: "2",
    name: "JNTUK",
    location: "Kakinada",
    naacRating: "A",
    fees: {
      "B.Tech": 35000,
      "M.Tech": 45000,
      "MBA": 50000
    },
    courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
    branches: {
      "CSE": {
        seats: 120,
        duration: "4 years",
        eligibility: "10+2 with PCM, minimum 60% aggregate",
        description: "Computer Science and Engineering program with focus on programming, data structures, and software engineering."
      },
      "ECE": {
        seats: 120,
        duration: "4 years",
        eligibility: "10+2 with PCM, minimum 60% aggregate",
        description: "Electronics and Communication Engineering covering digital electronics, communication systems, and VLSI design."
      },
      "Civil": {
        seats: 60,
        duration: "4 years",
        eligibility: "10+2 with PCM, minimum 60% aggregate",
        description: "Civil Engineering program covering structural engineering, construction technology, and environmental engineering."
      }
    },
    placementStats: [
      {
        year: 2023,
        studentsPlaced: 750,
        averagePackage: 5.8,
        maxPackage: 38,
        topRecruiters: ["Infosys", "TCS", "Cognizant", "HCL", "Tech Mahindra"]
      }
    ],
    accommodation: {
      hostel: {
        available: true,
        fees: 40000,
        amenities: ["WiFi", "Mess", "Library", "Sports Facilities"]
      },
      offCampus: {
        available: true,
        averageRent: 6000,
        options: ["PG Accommodations", "Private Hostels"]
      }
    },
    faculty: {
      totalCount: 380,
      withPhd: 220,
      withIndustryExp: 120
    }
  }
];