// Certificate and Capstone Data Management
import { ReactNode } from "react";

export interface CertificateData {
  id: string;
  title: string;
  organization: string;
  issueDate: string;
  credentialId?: string;
  color: string;
  pdfPath: string;
  description?: string;
}

export interface CapstoneProject {
  title: string;
  description: string;
  objectives: string[];
  problemStatement: string;
  features: string[];
  techStack: string[];
  developmentProcess: string[];
  screenshots: { url: string; caption: string }[];
  documentation?: { title: string; url: string };
  architecture?: string;
  heroImage: string;
}

// Extract certificate information from PDF filenames
// Format: "Certificate Title - Organization - Date.pdf"
export const parseCertificateFromFilename = (filename: string): Partial<CertificateData> => {
  const nameWithoutExt = filename.replace('.pdf', '');
  const parts = nameWithoutExt.split(' - ');
  
  const certificateMap: Record<string, { org: string; color: string; credentialId?: string }> = {
    'HTML & CSS': { org: 'Certiport / Pearson VUE', color: '#D72323' },
    'Networking': { org: 'Cisco / CompTIA', color: '#D72323' },
    'Network Security': { org: 'CompTIA / EC-Council', color: '#D72323' },
    'device confi': { org: 'Cisco Networking Academy', color: '#D72323', credentialId: 'CCNA' },
    'Python': { org: 'Python Institute / Coursera', color: '#D72323' },
  };
  
  let title = nameWithoutExt;
  let org = 'Professional Certification';
  let color = '#D72323';
  let credentialId = undefined;
  
  for (const [key, value] of Object.entries(certificateMap)) {
    if (nameWithoutExt.toLowerCase().includes(key.toLowerCase())) {
      title = key;
      org = value.org;
      color = value.color;
      credentialId = value.credentialId;
      break;
    }
  }
  
  return {
    title,
    organization: org,
    color,
    credentialId,
    issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  };
};

// Dynamically load certificates from the public certifications folder
export const loadCertificates = async (): Promise<CertificateData[]> => {
  // In a real app, this would fetch from an API endpoint
  // For now, we'll use the hardcoded PDF filenames we found
  const pdfFiles = [
    'device confi.pdf',
    'HTML & CSS.pdf',
    'Network Security.pdf',
    'Networking.pdf',
    'Python.pdf',
  ];
  
  return pdfFiles.map((filename, index) => {
    const parsed = parseCertificateFromFilename(filename);
    return {
      id: `cert-${index + 1}`,
      title: parsed.title || filename,
      organization: parsed.organization || 'Professional Certification',
      issueDate: parsed.issueDate || '2024',
      credentialId: parsed.credentialId,
      color: parsed.color || '#D72323',
      pdfPath: `/certifications/${filename}`,
      description: `Professional certification demonstrating expertise in ${parsed.title || 'IT'}`,
    };
  });
};

// Default capstone project data (would be replaced with actual project files)
export const getCapstoneProject = (): CapstoneProject => ({
  title: 'SmartFlow Dashboard',
  description: 'An AI-powered analytics dashboard with real-time data visualization and automated reporting pipelines for intelligent business intelligence.',
  objectives: [
    'Create a scalable, real-time analytics platform',
    'Integrate AI-powered data analysis and insights',
    'Provide intuitive data visualization',
    'Enable automated reporting and alerts',
    'Support multi-user collaboration',
  ],
  problemStatement:
    'Businesses struggle with real-time data analysis and reporting. Traditional dashboards require manual updates and lack intelligent insights. Our solution combines full-stack development with AI to provide automated, intelligent analytics.',
  features: [
    'Real-time Data Synchronization',
    'AI-Powered Insights Generation',
    'Interactive Data Visualizations',
    'Automated Report Generation',
    'User Authentication & Role Management',
    'Mobile Responsive Design',
    'Export to Multiple Formats',
  ],
  techStack: [
    'React 18',
    'TypeScript',
    'Node.js + Express',
    'MongoDB',
    'OpenAI API',
    'Recharts',
    'Tailwind CSS',
    'Docker',
  ],
  developmentProcess: [
    'Requirements Analysis & Planning',
    'System Architecture Design',
    'Frontend UI/UX Development',
    'Backend API Development',
    'AI Integration & Testing',
    'Database Optimization',
    'Deployment & DevOps Setup',
  ],
  screenshots: [
    { url: 'https://images.unsplash.com/photo-1625838144804-300f3907c110?w=800&h=500&fit=crop', caption: 'Main Dashboard View' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', caption: 'Analytics & Insights Panel' },
    { url: 'https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=800&h=500&fit=crop', caption: 'Report Generation Interface' },
  ],
  heroImage: 'https://images.unsplash.com/photo-1625838144804-300f3907c110?w=1200&h=600&fit=crop',
  documentation: {
    title: 'View Full Documentation',
    url: '#',
  },
  architecture: `\nFrontend: React-based SPA with Tailwind CSS for responsive design\nBackend: RESTful API with Node.js/Express\nDatabase: MongoDB for flexible data storage\nAI Layer: OpenAI API for intelligent insights\nDeployment: Docker containerization with Kubernetes orchestration\n  `,
});
