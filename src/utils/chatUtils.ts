import { College } from '../types/college';
import { colleges } from '../data/colleges';

interface WikiSearchResult {
  query: {
    search: Array<{
      pageid: number;
      title: string;
      snippet: string;
    }>;
  };
}

interface WikiContentResult {
  query: {
    pages: {
      [key: string]: {
        extract?: string;
      };
    };
  };
}

async function fetchWikipediaInfo(query: string): Promise<string> {
  if (!query) {
    return "Additional information not available at the moment.";
  }

  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query + ' college andhra pradesh')}&format=json&origin=*`;
    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      throw new Error(`Wikipedia search failed: ${searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json() as WikiSearchResult;
    if (!searchData?.query?.search?.length) {
      return "Additional information not available at the moment.";
    }

    const pageId = searchData.query.search[0].pageid;
    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=extracts&exintro=1&format=json&origin=*&explaintext=1`;
    const contentResponse = await fetch(contentUrl);
    if (!contentResponse.ok) {
      throw new Error(`Wikipedia content fetch failed: ${contentResponse.statusText}`);
    }

    const contentData = await contentResponse.json() as WikiContentResult;
    if (!contentData?.query?.pages) {
      return "Additional information not available at the moment.";
    }

    const extract = contentData.query.pages[pageId]?.extract;
    return extract || "Additional information not available at the moment.";
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching Wikipedia data:', error.message);
    } else {
      console.error('Unknown error fetching Wikipedia data');
    }
    return "Additional information not available at the moment.";
  }
}

async function fetchTopColleges(query: string): Promise<Array<{ title: string, snippet: string }>> {
  if (!query) {
    return [];
  }

  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${query} colleges andhra pradesh`)}&format=json&origin=*&srlimit=20`;
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.statusText}`);
    }
    
    const data = await response.json() as WikiSearchResult;
    if (!data?.query?.search) {
      return [];
    }
    
    return data.query.search.map(result => ({
      title: result.title,
      snippet: result.snippet.replace(/<\/?[^>]+(>|$)/g, "").trim()
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching colleges:', error.message);
    } else {
      console.error('Unknown error fetching colleges');
    }
    return [];
  }
}

async function fetchBranchColleges(branch: string): Promise<Array<{ title: string, snippet: string }>> {
  if (!branch) {
    return [];
  }

  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${branch} engineering colleges andhra pradesh`)}&format=json&origin=*&srlimit=20`;
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch branch colleges: ${response.statusText}`);
    }
    
    const data = await response.json() as WikiSearchResult;
    if (!data?.query?.search) {
      return [];
    }
    
    return data.query.search.map(result => ({
      title: result.title,
      snippet: result.snippet.replace(/<\/?[^>]+(>|$)/g, "").trim()
    }));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching branch colleges:', error.message);
    } else {
      console.error('Unknown error fetching branch colleges');
    }
    return [];
  }
}

function formatCollegeDetails(college: College, wikiInfo: string): string {
  const sections = [];

  // Basic Information
  sections.push(`🏛️ ${college.name}
Location: ${college.location}
NAAC Rating: ${college.naacRating}

📖 Overview:
${wikiInfo}\n`);

  // Courses and Fees
  sections.push(`📚 Available Courses:
${college.courses.map(course => `• ${course}: ₹${college.fees[course].toLocaleString('en-IN')}/year`).join('\n')}\n`);

  // Placement Statistics
  const latestStats = college.placementStats[0];
  sections.push(`🎯 Placement Statistics (${latestStats.year}):
• Students Placed: ${latestStats.studentsPlaced}
• Average Package: ₹${latestStats.averagePackage} LPA
• Maximum Package: ₹${latestStats.maxPackage} LPA
• Top Recruiters:
  ${latestStats.topRecruiters.map(recruiter => `- ${recruiter}`).join('\n  ')}\n`);

  // Accommodation
  sections.push(`🏠 Accommodation:
Hostel Facilities:
• Available: ${college.accommodation.hostel.available ? 'Yes' : 'No'}
• Fees: ₹${college.accommodation.hostel.fees.toLocaleString('en-IN')}/year
• Amenities:
  ${college.accommodation.hostel.amenities.map(amenity => `- ${amenity}`).join('\n  ')}

Off-Campus Options:
• Available: ${college.accommodation.offCampus.available ? 'Yes' : 'No'}
• Average Rent: ₹${college.accommodation.offCampus.averageRent.toLocaleString('en-IN')}/month
• Options:
  ${college.accommodation.offCampus.options.map(option => `- ${option}`).join('\n  ')}\n`);

  // Faculty Information
  sections.push(`👨‍🏫 Faculty:
• Total Faculty Members: ${college.faculty.totalCount}
• PhD Holders: ${college.faculty.withPhd}
• Industry Experience: ${college.faculty.withIndustryExp}`);

  return sections.join('\n');
}

async function formatBranchInfo(branch: string, colleges: College[]): Promise<string> {
  try {
    const collegesWithBranch = colleges.filter(college => college.branches[branch]);
    const wikiColleges = await fetchBranchColleges(branch);
    
    const sections = [`📚 Colleges offering ${branch}:\n\nFrom our Database:`];

    collegesWithBranch.forEach((college, index) => {
      sections.push(`${index + 1}. ${college.name}
• Location: ${college.location}
• NAAC Rating: ${college.naacRating}
• Available Seats: ${college.branches[branch].seats}
• Duration: ${college.branches[branch].duration}
• Annual Fee: ₹${college.fees["B.Tech"].toLocaleString('en-IN')}
• Eligibility: ${college.branches[branch].eligibility}
• Program Details: ${college.branches[branch].description}\n`);
    });

    if (wikiColleges.length > 0) {
      sections.push('\n🏛️ Other Notable Colleges offering this branch:');
      wikiColleges
        .filter(college => !collegesWithBranch.some(c => college.title.includes(c.name)))
        .slice(0, 15)
        .forEach((college, index) => {
          sections.push(`${index + 1}. ${college.title}
• ${college.snippet}\n`);
        });
    }

    return sections.join('\n');
  } catch (error) {
    console.error('Error formatting branch info:', error);
    return "Sorry, I couldn't fetch the branch information at the moment. Please try again.";
  }
}

async function formatCourseInfo(course: string): Promise<string> {
  try {
    const collegesWithCourse = colleges.filter(college => 
      college.courses.includes(course)
    );

    const wikiColleges = await fetchTopColleges(course);
    const sections = [`📚 Colleges offering ${course}:\n\nFrom our Database:`];

    collegesWithCourse.forEach((college, index) => {
      sections.push(`${index + 1}. ${college.name}
• Location: ${college.location}
• NAAC Rating: ${college.naacRating}
• Annual Fee: ₹${college.fees[course].toLocaleString('en-IN')}
• Placement Rate: ${(college.placementStats[0].studentsPlaced / college.faculty.totalCount * 100).toFixed(1)}%
• Average Package: ₹${college.placementStats[0].averagePackage} LPA\n`);
    });

    if (wikiColleges.length > 0) {
      sections.push('\n🏛️ Other Notable Colleges:');
      wikiColleges
        .filter(college => !collegesWithCourse.some(c => college.title.includes(c.name)))
        .slice(0, 15)
        .forEach((college, index) => {
          sections.push(`${index + 1}. ${college.title}
• ${college.snippet}\n`);
        });
    }

    return sections.join('\n');
  } catch (error) {
    console.error('Error formatting course info:', error);
    return "Sorry, I couldn't fetch the course information at the moment. Please try again.";
  }
}

export async function processUserMessage(message: string): Promise<string> {
  try {
    const lowercaseMessage = message.toLowerCase();
    
    // Check for college-specific queries
    for (const college of colleges) {
      if (lowercaseMessage.includes(college.name.toLowerCase())) {
        const wikiInfo = await fetchWikipediaInfo(college.name);
        return formatCollegeDetails(college, wikiInfo);
      }
    }

    // Check for branch-specific queries
    const branchMatches = Object.keys(colleges[0].branches).find(branch => 
      lowercaseMessage.includes(branch.toLowerCase())
    );
    if (branchMatches) {
      return await formatBranchInfo(branchMatches, colleges);
    }

    // Check for course-specific queries
    const courseMatches = colleges[0].courses.find(course => 
      lowercaseMessage.includes(course.toLowerCase())
    );
    if (courseMatches) {
      return await formatCourseInfo(courseMatches);
    }

    // If asking about other colleges or general queries
    if (lowercaseMessage.includes('other') || lowercaseMessage.includes('more')) {
      let searchTerm = 'engineering';
      if (lowercaseMessage.includes('b.tech')) searchTerm = 'B.Tech';
      if (lowercaseMessage.includes('m.tech')) searchTerm = 'M.Tech';
      if (lowercaseMessage.includes('mba')) searchTerm = 'MBA';
      if (lowercaseMessage.includes('mca')) searchTerm = 'MCA';
      
      const wikiColleges = await fetchTopColleges(searchTerm);
      const sections = [`🏛️ Additional Colleges in Andhra Pradesh offering ${searchTerm}:\n`];
      
      wikiColleges.slice(0, 20).forEach((college, index) => {
        sections.push(`${index + 1}. ${college.title}
• ${college.snippet}\n`);
      });
      
      return sections.join('\n');
    }

    return `I can help you find information about colleges in Andhra Pradesh. Try asking about:

• Specific colleges (e.g., "Tell me about Andhra University")
• Specific branches (e.g., "Tell me about CSE branch")
• Available courses (e.g., "Which colleges offer B.Tech?")
• Other colleges (e.g., "Show me other B.Tech colleges")

The information will be presented in a clear, structured format with details about fees, placements, and facilities.`;
  } catch (error) {
    console.error('Error processing message:', error);
    return "I apologize, but I encountered an error while processing your request. Please try again or rephrase your question.";
  }
}