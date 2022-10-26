function getTokenFromCookie(cookieName: string): string {
  if (typeof document === "undefined") return "";

  const cookies = document.cookie.split(";") ?? [];
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]!.trim();
    if (cookie.startsWith(`${cookieName}=`)) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return "";
}

async function digestMessage(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

function updateTokenInCookie(
  token: string,
  cookieName: string,
  tokenHours: number
) {
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + tokenHours * 1000 * 3600;
  now.setTime(expireTime);

  document.cookie = `${cookieName}=${token};expires=${now.toUTCString()};path=/`;
}

async function verifyPassword(
  user: string,
  pwd: string,
  cookieName: string
): Promise<boolean> {
  const username = await digestMessage(user);
  const password = await digestMessage(pwd);

  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { "content-type": "application/json" },
  });

  if (response.status === 401) {
    return false;
  }

  const resData = await response.json();
  updateTokenInCookie(resData.token, cookieName, resData.tokenHours);
  return true;
}

async function verifyToken(jwttoken: string): Promise<boolean> {
  const response = await fetch("/api/auth/verify", {
    method: "POST",
    body: JSON.stringify({ token: jwttoken }),
    headers: { "content-type": "application/json" },
  });

  if (response.status === 401) {
    return false;
  }

  return true;
}

export {
  getTokenFromCookie,
  digestMessage,
  updateTokenInCookie,
  verifyPassword,
  verifyToken,
};
