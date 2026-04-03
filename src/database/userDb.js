import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { isInstitutionalEmail, calculateUserLevel } from "../utils/userUtils";

/**
 * Creates a new user profile in Firestore.
 */
export const createUserProfile = async (user, additionalData = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();
    const verifiedBadge = isInstitutionalEmail(email);

    try {
      await setDoc(userRef, {
        displayName: displayName || (email ? email.split('@')[0] : 'New Learner'),
        email,
        photoURL: photoURL || null,
        createdAt,
        isVerified: verifiedBadge,
        credits: 100, // Initial credits
        streak: 0,
        rating: 5.0,
        level: 'JR',
        sessionsCompleted: 0,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user profile", error.message);
    }
  }

  return userRef;
};

/**
 * Updates user credits.
 */
export const updateUserCredits = async (uid, amount) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    credits: increment(amount)
  });
};

/**
 * Increments study streak.
 */
export const incrementStreak = async (uid) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    streak: increment(1)
  });
};

/**
 * Fetches user profile.
 */
export const getUserProfile = async (uid) => {
  if (!uid) return null;
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.exists() ? { uid, ...snapshot.data() } : null;
};
