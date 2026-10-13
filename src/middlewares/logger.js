export function logger(req, res, next) {
  console.log(req.method, req.url);
  next(); // Заавал next() дуудах ёстой, үгүй бол хүсэлт гацна!
}