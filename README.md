# 🌟 SportSee - Sports Analytics Dashboard

Bienvenue dans le projet SportSee, une application de tableau de bord d'analyse sportive.

## 📂 Structure du Projet

- `back/`: Contains the source code for the micro-service API.
- `front/`: Contains the source code for the frontend application.

## 🚀 Quick Start

### Prerequisites

- [NodeJS (version 12.18)](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (optional)

### Installation

1. **Clone the repository:**

```bash
git clone <url-du-repo>
cd SportSee
```

2. **Install backend dependencies:**

```bash
cd back
yarn install
```

3. **Install frontend dependencies:**

```bash
cd ../front
yarn install
```

### Launch the Project

#### Without Docker

1. **Backend:**

```bash
cd back
yarn dev
```

2. **Frontend:**

```bash
cd ../front
yarn dev
```

#### With Docker

1. **Build the Docker image:**

```bash
cd back
docker image build --no-cache -t micro-api .
```

2. **Run the Docker container:**

```bash
docker container run -d -p 3001:3001 --name micro-api micro-api
```

3. **Frontend:**

```bash
cd ../front
yarn dev
```

## 📖 Documentation

### Backend

Refer to the [backend README](./back/README.md) for more details on the API and available endpoints.

### Frontend

Refer to the [frontend README](./front/README.md) for more details on the frontend project structure and available scripts.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## 🎓 OpenClassrooms Project

This project is part of an OpenClassrooms training program.

Thank you for your interest in SportSee!
