# Formation DevOps Platform

Plateforme de formation dynamique pour apprendre les outils DevOps et d'ingénierie logicielle.

## Architecture Cloud

| Composant | Service | Technologie |
|-----------|---------|-------------|
| **Frontend** | [Vercel](https://vercel.com) | Next.js 14, Tailwind CSS |
| **Backend API** | [Render](https://render.com) | Express.js, Node.js |
| **Base de données** | [Turso](https://turso.tech) | LibSQL (SQLite distribué) |

## Outils couverts

| Outil | Durée | Niveau |
|-------|-------|--------|
| JFrog Artifactory | 12h | Intermédiaire |
| SonarQube | 10h | Intermédiaire |
| IBM DOORS | 15h | Avancé |
| IBM ClearCase | 14h | Avancé |
| Klocwork | 11h | Intermédiaire |
| Jenkins | 16h | Débutant à Avancé |

## Déploiement

### 1. Base de données Turso

```bash
# Installer Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Créer la base de données
turso db create formation-devops

# Obtenir l'URL et le token
turso db show formation-devops --url
turso db tokens create formation-devops
```

### 2. Backend sur Render

1. Créez un **New Web Service** sur render.com
2. Connectez votre repo GitHub, répertoire : `backend/`
3. Build Command : `npm install`
4. Start Command : `npm start`
5. Variables d'environnement :
   - `TURSO_DATABASE_URL` = URL obtenue à l'étape 1
   - `TURSO_AUTH_TOKEN` = Token obtenu à l'étape 1
   - `FRONTEND_URL` = URL de votre frontend Vercel
   - `SEED_SECRET` = Un secret pour protéger le seed

6. Après déploiement, initialisez la DB :
```bash
curl -X POST https://votre-api.onrender.com/api/seed \
  -H "x-seed-secret: votre-secret"
```

### 3. Frontend sur Vercel

1. Importez le repo sur vercel.com
2. Root Directory : `frontend/`
3. Framework : Next.js (auto-détecté)
4. Variables d'environnement :
   - `NEXT_PUBLIC_API_URL` = URL de votre backend Render

### Développement local

```bash
# Backend
cd backend
cp .env.example .env  # Configurez vos clés Turso
npm install
npm run db:seed       # Initialiser la base
npm run dev

# Frontend (autre terminal)
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/courses` | Liste des formations |
| GET | `/api/courses/:id` | Détail d'une formation |
| GET | `/api/modules/:courseId` | Modules d'un cours |
| GET | `/api/modules/:courseId/:moduleId` | Détail module |
| GET | `/api/quiz/:courseId` | Questions du quiz |
| POST | `/api/quiz/:courseId/submit` | Soumettre réponses |
| GET | `/api/progress/:userId` | Progression |
| POST | `/api/progress/:userId/complete` | Compléter module |
| POST | `/api/seed` | Initialiser la DB |

## Stack technique

- **Frontend** : Next.js 14 (App Router), Tailwind CSS, Server Components
- **Backend** : Express.js, Drizzle ORM, @libsql/client
- **Database** : Turso (LibSQL - SQLite distribué, edge)
- **Hosting** : Vercel (frontend), Render (backend)
