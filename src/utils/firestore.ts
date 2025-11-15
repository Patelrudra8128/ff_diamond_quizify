import { doc, getDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Calculate coins earned based on quiz score
 */
export function calculateCoinsEarned(score: number, totalQuestions: number): number {
  const percentage = (score / totalQuestions) * 100;
  const baseCoins = 10; // Base coins per question
  
  if (percentage >= 80) {
    // Excellent: 2x multiplier
    return Math.floor(score * baseCoins * 2);
  } else if (percentage >= 60) {
    // Good: 1.5x multiplier
    return Math.floor(score * baseCoins * 1.5);
  } else if (percentage >= 40) {
    // Average: 1x multiplier
    return Math.floor(score * baseCoins);
  } else {
    // Below average: 0.5x multiplier
    return Math.floor(score * baseCoins * 0.5);
  }
}

/**
 * Update coins in Firestore for a user
 */
export async function updateUserCoins(userId: string, coinsToAdd: number): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.error('User document does not exist');
      return false;
    }
    
    // Use increment to atomically update coins
    await updateDoc(userDocRef, {
      coins: increment(coinsToAdd)
    });
    
    return true;
  } catch (error) {
    console.error('Error updating user coins:', error);
    return false;
  }
}

/**
 * Update completed quizzes in Firestore for a user
 */
export async function updateCompletedQuizzes(userId: string, quizName: string): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.error('User document does not exist');
      return false;
    }
    
    // Use arrayUnion to add the quiz name to the completed_quiz array
    await updateDoc(userDocRef, {
      completed_quiz: arrayUnion(quizName)
    });
    
    return true;
  } catch (error) {
    console.error('Error updating completed quizzes:', error);
    return false;
  }
}

/**
 * Get current user coins from Firestore
 */
export async function getUserCoins(userId: string): Promise<number | null> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const userData = userDoc.data();
    return userData?.coins || 0;
  } catch (error) {
    console.error('Error getting user coins:', error);
    return null;
  }
}

/**
 * Set coins to a specific value (used for initialization)
 */
export async function setUserCoins(userId: string, coins: number): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.error('User document does not exist');
      return false;
    }
    
    await updateDoc(userDocRef, {
      coins: coins
    });
    
    return true;
  } catch (error) {
    console.error('Error setting user coins:', error);
    return false;
  }
}
