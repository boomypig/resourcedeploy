# My Project

## Resource

**Music App**

Attributes:

* Album (string)
* Title (string)
* Artist (string)
* Length (integer)
* Genre (string)

## Schema

```sql
CREATE TABLE musics (
id INTEGER PRIMARY KEY,
Album TEXT,
Title TEXT,
Artist TEXT,
Length INTEGER,
Genre TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve music collection      | GET    | /musics
Retrieve music member          | GET    | /musics/*\<id\>*
Create music member            | POST   | /musics
Update music member            | PUT    | /musics/*\<id\>*
Delete music member            | DELETE | /musics/*\<id\>*

## How to Access the App

navigate to http://music.zorran.tech/

## How to build the Docker Containers

## How to Deploy All Deployments on Kubernetes

### Prerequisites
1. Ensure you have Docker installed on your machine.
2. Ensure you have Kubernetes installed on your system.
3. Ensure you have `kubectl` installed and configured to interact with your Kubernetes cluster.

### Step-by-Step Instructions

#### Backend Deployment

1. **Build and Push Docker Image for Backend:**
   - Open a terminal (VS Code terminal will work fine).
   - Navigate to the `server` folder where the `Dockerfile` is located.
   - Run the following commands:
     ```sh
     docker login
     docker build -t yourdockerhubusername/backend-app .
     docker push yourdockerhubusername/backend-app
     ```

2. **Update Kubernetes Deployment File for Backend:**
   - Navigate to the `deployments` directory.
   - Open `backend-deployment.yaml` in a file editor.
   - Replace `sorenbybee/music-backend-app` with `yourdockerhubusername/music-backend-app` in the `image` field.
   - Save the file.

3. **Apply Kubernetes Deployment for Backend:**
   - Run the following command:
     ```sh
     kubectl apply -f backend-deployment.yaml
     ```

#### Frontend Deployment

1. **Build and Push Docker Image for Frontend:**
   - Open a terminal (VS Code terminal will work fine).
   - Navigate to the `client` folder where the `Dockerfile` is located.
   - Run the following commands:
     ```sh
     docker login
     docker build -t yourdockerhubusername/frontend-app .
     docker push yourdockerhubusername/frontend-app
     ```

2. **Update Kubernetes Deployment File for Frontend:**
   - Navigate to the `deployments` directory.
   - Open `frontend-deployment.yaml` in a file editor.
   - Replace `sorenbybee/music-frontend-app` with `yourdockerhubusername/music-frontend-app` in the `image` field.
   - Save the file.

3. **Apply Kubernetes Deployment for Frontend:**
   - Run the following command:
     ```sh
     kubectl apply -f frontend-deployment.yaml
     ```

### Deploying the Kitter Backend and Frontend Services

1. **Apply Kubernetes Service for Backend:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f backend-service.yaml
     ```

2. **Apply Kubernetes Service for Frontend:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f frontend-service.yaml
     ```

### Deploying Kitter Ingress

1. **Apply Kubernetes Ingress:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f ingress.yaml
     ```

### Deploying Contour

1. **Apply Contour Configuration:**
   - Navigate to the `deployments` directory.
   - Run the following command:
     ```sh
     kubectl apply -f contour.yaml
     ```

### Verify Deployments

1. **Check the status of your deployments:**
   - Run the following command to get the status of your deployments:
     ```sh
     kubectl get deployments
     ```

2. **Check the status of your pods:**
   - Run the following command to get the status of your pods:
     ```sh
     kubectl get pods
     ```

By following these steps, you should be able to deploy both the backend and frontend applications, services, ingress, and contour on Kubernetes successfully.
