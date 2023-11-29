const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey == process.env.API_KEY) {
        next();
    } else {
        return res.status(403).json('Unauthorized access');
    }
};
module.exports = apiKeyMiddleware