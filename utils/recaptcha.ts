/**
 * Google reCAPTCHA v3 server-side verification utility
 */

interface RecaptchaVerificationResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

interface VerificationResult {
  success: boolean;
  score: number;
  error?: string;
}

/**
 * Verifies a reCAPTCHA token with Google's API
 * @param token - The reCAPTCHA token from the client
 * @param minScore - Minimum acceptable score (default: 0.5)
 * @returns Verification result with success status and score
 */
export async function verifyRecaptcha(
  token: string,
  minScore: number = 0.5
): Promise<VerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not defined in environment variables");
    return {
      success: false,
      score: 0,
      error: "reCAPTCHA configuration error",
    };
  }

  if (!token) {
    return {
      success: false,
      score: 0,
      error: "No reCAPTCHA token provided",
    };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data: RecaptchaVerificationResponse = await response.json();

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return {
        success: false,
        score: 0,
        error: `Verification failed: ${data["error-codes"]?.join(", ")}`,
      };
    }

    // Check if score meets minimum threshold
    if (data.score < minScore) {
      console.warn(
        `reCAPTCHA score ${data.score} is below minimum threshold ${minScore}`
      );
      return {
        success: false,
        score: data.score,
        error: `Score ${data.score} is below threshold ${minScore}`,
      };
    }

    return {
      success: true,
      score: data.score,
    };
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return {
      success: false,
      score: 0,
      error: "Network error during verification",
    };
  }
}
