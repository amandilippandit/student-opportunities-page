import scholarshipImg from '@/assets/scholarship.jpg';
import internshipImg from '@/assets/internship.jpg';
import summitImg from '@/assets/summit.jpg';
import competitionImg from '@/assets/competition.jpg';

export type OpportunityType = 'scholarship' | 'internship' | 'summit' | 'competition';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  description: string;
  fullDescription: string;
  deadline: string;
  location: string;
  amount?: string;
  url: string;
  tags: string[];
  image: string;
}

const typeImages: Record<OpportunityType, string> = {
  scholarship: scholarshipImg,
  internship: internshipImg,
  summit: summitImg,
  competition: competitionImg,
};

export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Gates Millennium Scholars Program',
    organization: 'Bill & Melinda Gates Foundation',
    type: 'scholarship',
    description: 'Full scholarship for outstanding minority students with significant financial need to pursue undergraduate studies.',
    fullDescription: 'The Gates Millennium Scholars Program is a prestigious scholarship initiative funded by the Bill & Melinda Gates Foundation. It provides full scholarships to outstanding minority students who demonstrate significant financial need and exceptional academic achievement. Recipients receive funding for tuition, fees, books, and living expenses throughout their undergraduate studies. The program also offers leadership development opportunities, mentorship, and a strong network of fellow scholars committed to making a difference in their communities.',
    deadline: '2024-09-15',
    location: 'United States',
    amount: 'Full Tuition',
    url: 'https://gmsp.org',
    tags: ['undergraduate', 'full-ride', 'minority'],
    image: typeImages.scholarship,
  },
  {
    id: '2',
    title: 'Google STEP Internship',
    organization: 'Google',
    type: 'internship',
    description: 'A developmental internship for first and second-year undergraduate students with a passion for computer science.',
    fullDescription: 'Google STEP (Student Training in Engineering Program) is a developmental internship designed specifically for first and second-year undergraduate students who are passionate about technology and computer science. During this 12-week summer program, interns work on real projects alongside experienced Google engineers, gaining hands-on experience with cutting-edge technologies. The program includes mentorship, technical training, and networking opportunities with professionals across the company. STEP interns contribute to meaningful products that impact billions of users worldwide.',
    deadline: '2024-10-30',
    location: 'Mountain View, CA',
    amount: '$8,000/month',
    url: 'https://careers.google.com/students/',
    tags: ['tech', 'undergraduate', 'paid'],
    image: typeImages.internship,
  },
  {
    id: '3',
    title: 'One Young World Summit 2024',
    organization: 'One Young World',
    type: 'summit',
    description: 'Global forum for young leaders to connect and develop solutions for pressing global issues.',
    fullDescription: 'One Young World is the premier global forum for young leaders, bringing together the brightest minds from around the world to address the most pressing issues facing humanity. The annual Summit gathers over 2,000 young leaders from 190+ countries to hear from world leaders, develop actionable plans, and build lasting connections. Delegates participate in working sessions, hear from influential speakers, and collaborate on initiatives addressing climate change, poverty, education, and more. This is an unparalleled opportunity to join a community of changemakers.',
    deadline: '2024-08-01',
    location: 'Montreal, Canada',
    url: 'https://oneyoungworld.com',
    tags: ['leadership', 'global', 'networking'],
    image: typeImages.summit,
  },
  {
    id: '4',
    title: 'Hult Prize Competition',
    organization: 'Hult Prize Foundation',
    type: 'competition',
    description: 'World\'s largest student competition for social good. Win $1M in seed funding for your startup idea.',
    fullDescription: 'The Hult Prize is the world\'s largest student competition and startup platform for social good. Each year, thousands of university students compete to solve a pressing social challenge set by the UN. Teams progress through campus rounds, regional accelerators, and ultimately compete for $1 million in seed funding at the global finals. Beyond the prize money, participants gain access to mentorship from industry experts, exposure to global investors, and join a network of social entrepreneurs dedicated to creating positive change.',
    deadline: '2024-12-01',
    location: 'Global',
    amount: '$1,000,000',
    url: 'https://hultprize.org',
    tags: ['entrepreneurship', 'social-impact', 'startup'],
    image: typeImages.competition,
  },
  {
    id: '5',
    title: 'Fulbright Scholarship',
    organization: 'U.S. Department of State',
    type: 'scholarship',
    description: 'Prestigious international educational exchange program for graduate studies, research, or teaching abroad.',
    fullDescription: 'The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government. It offers opportunities for graduate students, young professionals, and artists to study, conduct research, or teach English abroad. Fulbrighters engage in cutting-edge research and expand their professional networks while immersing themselves in local communities and cultures. The program aims to increase mutual understanding between the people of the United States and other countries, fostering lasting connections and cross-cultural dialogue.',
    deadline: '2024-10-15',
    location: 'International',
    amount: 'Full Funding',
    url: 'https://us.fulbrightonline.org',
    tags: ['graduate', 'research', 'international'],
    image: typeImages.scholarship,
  },
  {
    id: '6',
    title: 'Microsoft Explore Internship',
    organization: 'Microsoft',
    type: 'internship',
    description: '12-week summer internship designed for first and second-year college students passionate about technology.',
    fullDescription: 'Microsoft Explore is a 12-week summer internship program designed specifically for first and second-year college students who are curious about careers in software engineering and program management. Interns rotate through different roles, gaining exposure to both technical and business aspects of product development. The program provides hands-on experience working on real Microsoft products, mentorship from experienced professionals, and professional development workshops. Explore interns become part of a supportive community that helps them grow their skills and discover their career paths.',
    deadline: '2024-09-30',
    location: 'Redmond, WA',
    amount: '$7,500/month',
    url: 'https://careers.microsoft.com',
    tags: ['tech', 'undergraduate', 'paid'],
    image: typeImages.internship,
  },
  {
    id: '7',
    title: 'World Economic Forum Young Global Leaders',
    organization: 'World Economic Forum',
    type: 'summit',
    description: 'A community of innovative, enterprising, and socially-minded leaders under 40 shaping the future.',
    fullDescription: 'The Young Global Leaders community is a unique, multi-stakeholder community of more than 1,400 members and alumni of exceptional leaders under 40 who are driving change across business, government, and civil society. Selected through a rigorous nomination and selection process, YGLs participate in a five-year program of leadership development, peer learning, and collaborative action. Members gain access to World Economic Forum meetings, including the Annual Meeting in Davos, and work together on initiatives addressing global challenges from climate change to inclusive growth.',
    deadline: '2024-07-15',
    location: 'Davos, Switzerland',
    url: 'https://weforum.org/communities/young-global-leaders',
    tags: ['leadership', 'global', 'executive'],
    image: typeImages.summit,
  },
  {
    id: '8',
    title: 'Google Solution Challenge',
    organization: 'Google Developer Student Clubs',
    type: 'competition',
    description: 'Build solutions using Google technologies to address UN Sustainable Development Goals.',
    fullDescription: 'The Google Solution Challenge invites university students worldwide to build solutions using Google technologies that address one or more of the United Nations 17 Sustainable Development Goals. Teams of up to 4 students develop projects over several months, with support from Google Developer Student Club mentors. Top teams receive prizes, mentorship from Google experts, and the opportunity to showcase their solutions on a global stage. Past winners have created apps addressing education access, environmental monitoring, healthcare delivery, and more.',
    deadline: '2024-03-31',
    location: 'Global',
    amount: '$10,000',
    url: 'https://developers.google.com/community/gdsc-solution-challenge',
    tags: ['tech', 'social-impact', 'google'],
    image: typeImages.competition,
  },
  {
    id: '9',
    title: 'Rhodes Scholarship',
    organization: 'Rhodes Trust',
    type: 'scholarship',
    description: 'The oldest and most prestigious international scholarship for postgraduate study at Oxford University.',
    fullDescription: 'The Rhodes Scholarship is the oldest and most prestigious international scholarship program in the world, established in 1902 through the will of Cecil Rhodes. Each year, 100 scholars from around the world are selected to pursue postgraduate study at the University of Oxford. Rhodes Scholars are chosen not only for their outstanding academic achievements but also for their character, commitment to service, and leadership potential. The scholarship covers all university and college fees, provides a living stipend, and offers access to a global network of accomplished alumni.',
    deadline: '2024-10-01',
    location: 'Oxford, UK',
    amount: 'Full Funding',
    url: 'https://rhodeshouse.ox.ac.uk/scholarships/',
    tags: ['graduate', 'prestigious', 'uk'],
    image: typeImages.scholarship,
  },
  {
    id: '10',
    title: 'Meta University Internship',
    organization: 'Meta',
    type: 'internship',
    description: 'A paid 10-week summer internship for first-generation college students and underrepresented minorities.',
    fullDescription: 'Meta University is a paid 10-week summer internship program designed to provide underrepresented groups, including first-generation college students, with an introduction to careers in technology. Interns work on meaningful projects across engineering, analytics, and design, while receiving mentorship and professional development support. The program includes technical training, exposure to Meta\'s products and culture, and networking opportunities with leaders across the company. Meta University alumni often return for additional internships and full-time positions at Meta.',
    deadline: '2024-11-15',
    location: 'Menlo Park, CA',
    amount: '$8,000/month',
    url: 'https://metacareers.com/careerprograms/pathways/metau',
    tags: ['tech', 'diversity', 'paid'],
    image: typeImages.internship,
  },
  {
    id: '11',
    title: 'Clinton Global Initiative University',
    organization: 'Clinton Foundation',
    type: 'summit',
    description: 'Annual meeting to empower student leaders to turn their ideas into action and create positive change.',
    fullDescription: 'Clinton Global Initiative University (CGI U) is a program of the Clinton Foundation that brings together college students who are committed to addressing global challenges in their communities and around the world. Each year, students gather for the CGI U annual meeting where they develop Commitments to Action—new, specific, and measurable plans to address pressing issues. Participants receive year-round support, funding opportunities, and access to a network of fellow student leaders, mentors, and experts dedicated to creating positive change.',
    deadline: '2024-11-01',
    location: 'Various US Cities',
    url: 'https://clintonfoundation.org/cgi-u',
    tags: ['leadership', 'social-impact', 'networking'],
    image: typeImages.summit,
  },
  {
    id: '12',
    title: 'Imagine Cup',
    organization: 'Microsoft',
    type: 'competition',
    description: 'Global technology competition empowering students to use technology to solve real-world problems.',
    fullDescription: 'Microsoft Imagine Cup is a global technology competition that empowers the next generation of computer science students to apply their passion and creativity to solve real-world problems. Teams create innovative solutions using Microsoft technologies including Azure, AI, and mixed reality. The competition includes regional rounds, online semifinals, and a World Finals where top teams compete for prizes, mentorship, and the opportunity to bring their ideas to life. Past participants have gone on to launch successful startups and careers at leading tech companies.',
    deadline: '2024-02-15',
    location: 'Global',
    amount: '$100,000',
    url: 'https://imaginecup.microsoft.com',
    tags: ['tech', 'innovation', 'microsoft'],
    image: typeImages.competition,
  },
];

export const locations = [
  'All Locations',
  'United States',
  'International',
  'Europe',
  'Global',
  'Remote',
];

export const deadlineFilters = [
  { label: 'All Deadlines', value: 'all' },
  { label: 'Next 30 days', value: '30' },
  { label: 'Next 60 days', value: '60' },
  { label: 'Next 90 days', value: '90' },
];
