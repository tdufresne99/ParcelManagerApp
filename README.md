# 📦 Parcel Manager

**Parcel Manager** est une application web full stack qui permet de gérer la livraison de colis. Elle offre la possibilité de créer, modifier, supprimer et importer plusieurs colis à partir d’un fichier JSON. Ce projet a été conçu pour illustrer mes compétences en développement web moderne avec .NET et Angular.

---

## 🛠️ Technologies utilisées

### 🔙 Backend – ASP.NET Core (.NET 9)
- API RESTful en ASP.NET Core Web API
- Entity Framework Core pour l’accès aux données
- SQLite en développement local
- Swagger UI pour documenter et tester l’API
- Support de l’importation JSON avec détection des doublons

### 🌐 Frontend – Angular (v20)
- Angular Material pour une interface responsive
- Formulaires réactifs pour la création/édition de colis
- Téléversement de fichiers JSON avec parsing et validation
- Intégration complète avec l’API backend

---

## ✨ Fonctionnalités

- 📦 Créer, modifier, supprimer des colis
- 📁 Importer plusieurs colis via un fichier JSON
- 🗓️ Sélection de la date de livraison
- 🧼 Validation des formulaires
- 🔄 Communication complète Angular/.NET

---

## 📂 Structure du projet

```bash
📁 parcel-manager/
├── 📁 backend/         # API ASP.NET Core
│   └── ...
├── 📁 frontend/        # Application Angular
│   └── ...
├── README.md
└── ...
