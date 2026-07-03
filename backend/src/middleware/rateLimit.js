// Simple in-memory rate limiter
// Max 100 requests per minute per IP

const requests = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requests.entries()) {
    if (now - data.windowStart > WINDOW_MS * 2) {
      requests.delete(key);
    }
  }
}, 5 * 60 * 1000);

export default function rateLimit(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();

  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, windowStart: now });
    return next();
  }

  const data = requests.get(ip);

  // Reset window if expired
  if (now - data.windowStart > WINDOW_MS) {
    data.count = 1;
    data.windowStart = now;
    return next();
  }

  // Increment count
  data.count++;

  if (data.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((data.windowStart + WINDOW_MS - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: 'Too Many Requests',
      message: 'Trop de requêtes. Veuillez réessayer dans quelques instants.',
      retryAfter,
    });
  }

  next();
}
