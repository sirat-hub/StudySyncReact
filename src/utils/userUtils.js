/**
 * Checks if an email belongs to an educational institute.
 * For this MVP, we consider emails ending in .edu, .edu.pk or similar as institutional.
 * @param {string} email 
 * @returns {boolean}
 */
export const isInstitutionalEmail = (email) => {
  const institutionalDomains = ['.edu', '.ac.uk', '.edu.pk', '.edu.in', '.edu.au'];
  return institutionalDomains.some(domain => email.toLowerCase().endsWith(domain));
};

/**
 * Calculates the user level based on credits and ratings.
 * @param {number} credits 
 * @param {number} rating 
 * @returns {string} - JR, Tutor, Master
 */
/**
 * Calculates compatibility percentage between two users based on AI rules.
 */
export const calculateCompatibility = (userA, userB) => {
  let score = 50; // Base score
  
  if (userA.level === userB.level) score += 10;
  if (userA.isVerified && userB.isVerified) score += 15;
  
  // Simulated matching based on interests/subjects
  const commonSubjects = userA.subjects?.filter(s => userB.subjects?.includes(s)) || [];
  score += (commonSubjects.length * 10);
  
  return Math.min(score, 100);
};

export const calculateUserLevel = (credits, rating) => {
  if (credits > 1000 && rating >= 4.5) return 'Master';
  if (credits > 500 && rating >= 4.0) return 'Tutor';
  return 'JR';
};
