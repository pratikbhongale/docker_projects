# Flask Application with Docker 🐳

This project demonstrates how to create a simple **Flask web application**, containerize it using **Docker**, and run it locally.

---

## 📌 Prerequisites

Make sure you have the following installed:

* **Python 3.8+** (for local testing, optional)
* **Docker** (required)
* **Git** (optional)

Check installation:

```bash
docker --version
```

---

## 📁 Project Structure

```
project-folder/
│
├── app.py
├── requirements.txt
└── Dockerfile
```

---

## 📄 app.py

This is the main Flask application file.

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello"

app.run(host="0.0.0.0", port=5000)
```

### Explanation:

* Creates a Flask app
* Defines a route `/`
* Returns `"Hello"` when accessed
* Uses `0.0.0.0` to allow access from Docker

---

## 📄 requirements.txt

Lists Python dependencies:

```
flask
```

---

## 📄 Dockerfile

Used to build the Docker image:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]
```

### Dockerfile Explanation:

* `FROM` → Uses Python base image
* `WORKDIR` → Sets working directory
* `COPY requirements.txt` → Copies dependency file
* `pip install --no-cache-dir` → Installs dependencies without cache
* `COPY app.py` → Copies application code
* `EXPOSE 5000` → Exposes Flask port
* `CMD` → Runs the Flask app

---

## 🚀 Build the Docker Image

Run this command inside the project directory:

```bash
docker build -t flask-app .
```

---

## ▶️ Run the Docker Container

```bash
docker run -p 5000:5000 flask-app
```

### Explanation:

* `-p 5000:5000` maps container port to local machine
* Flask runs on port `5000`

---

## 🌐 Access the Application

Open your browser and go to:

```
http://localhost:5000
```

You should see:

```
Hello
```

---

## 🛑 Stop the Container

Press:

```bash
CTRL + C
```

Or find and stop it manually:

```bash
docker ps
docker stop <container_id>
```

---

## 🧠 Important Concepts

### Why `0.0.0.0`?

* Required for Docker to allow external access
* `127.0.0.1` will not work inside containers

### Why container exits for simple scripts?

* Docker containers stop when the main process ends
* Flask keeps running because it starts a web server

### Why `--no-cache-dir`?

* Prevents pip from storing cache
* Reduces Docker image size
* Best practice for containers

---

## 🛠 Useful Docker Commands

```bash
docker images
docker ps
docker ps -a
docker logs <container_id>
docker rm <container_id>
docker rmi <image_id>
```

---

## 📦 Optional Improvements

* Use **Gunicorn** for production
* Add **debug mode**
* Use **docker-compose**
* Add environment variables
* Add `.dockerignore`

---

## ✅ Conclusion

This project shows how to:

* Build a Flask app
* Containerize it using Docker
* Run and access it locally

Perfect for **learning Docker + Flask basics** 🚀

---
