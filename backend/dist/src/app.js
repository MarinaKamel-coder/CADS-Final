import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Import des routes
import clientRoutes from './routes/client.routes';
import deadlineRoutes from './routes/deadline.routes';
import documentRoutes from './routes/document.routes';
import alertRoutes from "./routes/alert.routes";
// Import des middlewares
import { clerkAuth, requireAuth } from './middlewares/clerk.middleware.js';
import { syncUser } from "./middlewares/syncUser.middleware.js";
// Nécessaire pour manipuler les chemins avec ESM ("type": "module")
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));
// 2. Authentification globale (Clerk)
// Ce middleware intercepte le jeton JWT et remplit req.auth
app.use(clerkAuth);
// 3. Synchronisation utilisateur
// S'assure que l'utilisateur Clerk existe dans notre DB Prisma
app.use(syncUser);
// 4. Routes de l'API
// On applique requireAuth ici pour protéger toutes les ressources
app.use('/api/clients', requireAuth, clientRoutes);
app.use('/api/deadlines', requireAuth, deadlineRoutes);
app.use('/api/documents', requireAuth, documentRoutes);
app.use("/api/alerts", requireAuth, alertRoutes);
if (process.env.NODE_ENV === 'production') {
    // Le dossier build de React (Vite) se trouvera dans ../../frontend/dist 
    // car nous sommes dans backend/src/
    const frontendPath = path.join(__dirname, '../../frontend/dist');
    app.use(express.static(frontendPath));
    // Pour toutes les routes non-API, on renvoie l'index.html de React
    app.get('*', (req, res) => {
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(frontendPath, 'index.html'));
        }
    });
}
// 5. Gestion des erreurs globale (Optionnel mais recommandé)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Une erreur interne est survenue" });
});
export default app;
//# sourceMappingURL=app.js.map