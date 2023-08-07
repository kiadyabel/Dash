/*const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // L'URL de l'API que vous appelez
    createProxyMiddleware({
      target: "http://test.krillsolutions.com", // Adresse du serveur API
      changeOrigin: true, // Nécessaire pour les requêtes cross-origin
      pathRewrite: {
        "^/api": "", // Retirez le préfixe /api de la requête
      },
    })
  );
};
*/