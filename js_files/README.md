# JS Files Storage Docker Container 🐳

This project demonstrates how to **store your JavaScript (or any other) files inside a Docker container**.

> **Note:** This container is only for storing files. It does **not run a web server** or execute the JS files.

---

## 📌 Prerequisites

* **Docker installed**
  Check installation:

  ```bash
  docker --version
  ```

* Basic understanding of command line

---

## 📁 Project Structure

```
my-files/
│
├── file1.js
├── file2.js
├── file3.txt
└── Dockerfile
```

* Add all the files you want to store inside the container in the same folder as the Dockerfile.

---

## 📄 Dockerfile

```dockerfile
# Use a small Linux image
FROM alpine:latest

# Set working directory inside container
WORKDIR /data

# Copy all files from local directory to container
COPY . .

# Keep the container alive for interactive access
CMD ["sleep", "infinity"]
```

### Explanation:

1. `FROM alpine:latest` → Tiny Linux image (~5 MB)
2. `WORKDIR /data` → All files copied here, sets working directory
3. `COPY . .` → Copies all local files into container
4. `CMD ["sleep", "infinity"]` → Keeps container alive so you can access the files interactively

---

## 🚀 Build the Docker Image

```bash
docker build -t my-js-files .
```

* `-t my-js-files` → Names your Docker image
* `.` → Current directory contains Dockerfile and files

---

## ▶️ Run the Docker Container

```bash
docker run -dit --name js-files-container my-js-files
```

* `-d` → Run in background (detached)
* `-i` → Interactive mode
* `-t` → Allocates a pseudo-TTY
* `--name` → Gives a name to the container

---

## 🔍 Access the Files Inside Container

```bash
docker exec -it js-files-container /bin/sh
```

Inside the container:

```sh
cd /data
ls
cat file1.js
```

---

## ⚠️ Important Notes

1. **Why keep the container alive?**

   * Docker containers **stop automatically** when the main process exits.
   * `sleep infinity` is a dummy process that **keeps the container running**.
   * This allows you to access files interactively anytime.

2. **Are the files permanent?**

   * Files exist in the **image**, not just the container.
   * If you delete the container, you can **create a new container** from the same image with all files intact:

     ```bash
     docker run -dit --name new-container my-js-files
     ```

3. **Editing files**

   * Minimal images like Alpine **do not include editors**.
   * You can:

     * Install `vim` inside container (temporary)

       ```sh
       apk add vim
       vim file1.js
       ```
     * Or edit files **locally** and rebuild image:

       ```bash
       docker build -t my-js-files .
       ```

4. **Access from host machine (optional)**

   * Use **bind mounts** to sync local folder with container:

     ```bash
     docker run -dit -v $(pwd):/data --name js-files-container my-js-files
     ```
   * Changes to local files will reflect inside container immediately.

---

## 🛠 Useful Docker Commands

```bash
# List all containers
docker ps -a

# Check running containers
docker ps

# Stop a container
docker stop js-files-container

# Remove a container
docker rm js-files-container

# Remove an image
docker rmi my-js-files
```

---

## ☁️ Push the Image to Docker Hub

1. **Login**

```bash
docker login
```

2. **Tag your image**

```bash
docker tag my-js-files <dockerhub-username>/my-js-files:latest
```

3. **Push**

```bash
docker push <dockerhub-username>/my-js-files:latest
```

4. **Pull later**

```bash
docker pull <dockerhub-username>/my-js-files:latest
```

---

## ✅ Summary

* This Dockerfile allows you to **store files inside a container**.
* No web server or Python is required.
* The container stays alive using `sleep infinity`.
* Files can be accessed, edited (temporarily inside container), or persist by building images.

---

💡 **Memory Trick:**

> **Docker image = a “box” storing your files**
> **Container = a running “instance” of that box**
> Use `sleep infinity` to keep the box “open” for inspection.

---

Do you want me to do that?
