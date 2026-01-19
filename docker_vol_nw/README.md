# Docker Mini Project: Understanding Networks and Volumes (Fundamentals + Real World)

## 📌 Purpose of This Project

This mini project is designed to **deeply understand Docker fundamentals**, specifically:

- **Docker Volumes** (data persistence)
- **Docker Networks** (container-to-container communication)
- Why containers are **stateless**
- How Docker concepts map to **real-world systems (AWS / production)**

This is not just a demo — it explains **why things work**, not only *how*.

---

## 🧠 Core Docker Problems This Project Solves

Containers are:
- Lightweight
- Easy to recreate
- **Ephemeral (temporary)**

If a container:
- Stops
- Crashes
- Is deleted

👉 **All data inside it is lost**

Docker introduces **Volumes** and **Networks** to solve this.

---

## 🏗 Project Architecture

```

Browser
|
|  [http://localhost:8080](http://localhost:8080)
v
[ web container ]
|
|  HTTP request (Docker Network)
v
[ logger container ]
|
|  File write
v
[ Docker Volume (persistent logs) ]

````

---

## 🔑 Key Docker Concepts Demonstrated

### 1️⃣ Docker Volume (Persistence)

**What it is:**
> A Docker volume is storage that lives **outside containers**

**Why it exists:**
- Containers are disposable
- Data must survive container restarts

**In this project:**
- Logs are written to a shared volume
- Logger container can be deleted and recreated
- Logs remain intact

**Real-world use cases:**
- Databases (MySQL, PostgreSQL)
- Application logs
- File uploads (images, PDFs)

---

### 2️⃣ Docker Network (Communication)

**What it is:**
> A Docker network is a private communication space for containers

**What it provides:**
- Private IP addresses
- DNS (container name resolution)
- Isolation

**In this project:**
- `web` container talks to `logger`
- Uses container name (`logger`), not IP
- Communication only works inside the same network

**Real-world use cases:**
- Microservices architecture
- Frontend ↔ backend communication
- Secure internal services (DB not public)

---

## 🌍 Real-World Mental Model

| Real World | Docker |
|-----------|--------|
EC2 instance | Container |
EBS volume | Docker volume |
VPC / subnet | Docker network |
Private DNS | Container name |
Load balancer | Reverse proxy |

---

## 📁 Project Setup

### Create project directory
```bash
mkdir docker-mini-project
cd docker-mini-project
````

---

## 📦 Step 1: Create a Docker Volume

```bash
docker volume create log_volume
```

This volume will:

* Store logs
* Survive container deletion

---

## 🌐 Step 2: Create a Docker Network

```bash
docker network create app_net
```

This network provides:

* Private communication
* DNS-based service discovery

---

## 📝 Step 3: Run Logger Container

The logger:

* Listens on port `5000`
* Writes messages to `/logs/app.log`

```bash
docker run -d \
  --name logger \
  --network app_net \
  -v log_volume:/logs \
  python:3.11-slim \
  sh -c "
  pip install flask &&
  python - << 'EOF'
from flask import Flask, request
app = Flask(__name__)

@app.route('/log')
def log():
    msg = request.args.get('msg', 'no message')
    with open('/logs/app.log', 'a') as f:
        f.write(msg + '\\n')
    return 'logged'

app.run(host='0.0.0.0', port=5000)
EOF
"
```

---

## 🌍 Step 4: Run Web Container

The web container:

* Exposes port `8080`
* Sends messages to the logger using container DNS

```bash
docker run -d \
  --name web \
  --network app_net \
  -p 8080:5000 \
  python:3.11-slim \
  sh -c "
  pip install flask requests &&
  python - << 'EOF'
from flask import Flask
import requests

app = Flask(__name__)

@app.route('/')
def home():
    requests.get('http://logger:5000/log?msg=Hello from web')
    return 'Message sent to logger'

app.run(host='0.0.0.0', port=5000)
EOF
"
```

---

## ✅ Step 5: Test the Application

Open in browser:

```
http://localhost:8080
```

Expected output:

```
Message sent to logger
```

---

## 🔍 Step 6: Verify Volume Persistence

Enter logger container:

```bash
docker exec -it logger sh
```

Check logs:

```bash
cat /logs/app.log
```

Output:

```
Hello from web
```

---

## 💥 Step 7: Prove Containers Are Disposable

Delete logger:

```bash
docker rm -f logger
```

Recreate it:

```bash
docker run -d \
  --name logger \
  --network app_net \
  -v log_volume:/logs \
  python:3.11-slim sleep 10000
```

Check logs again:

```bash
docker exec -it logger sh
cat /logs/app.log
```

✅ Logs still exist
❌ Old container does not

---

## 🔒 Step 8: Prove Network Isolation

Without network:

```bash
docker run --rm busybox ping logger
```

❌ Fails

With network:

```bash
docker run --rm --network app_net busybox ping logger
```

✅ Works

---

## 🧠 Fundamental Rules Learned

### Rule 1

**Never store important data inside containers**

### Rule 2

**Always use container names, never IPs**

### Rule 3

**Containers should be disposable**

### Rule 4

**Volumes store state, networks enable communication**

---

## 🧹 Cleanup

```bash
docker rm -f web logger
docker volume rm log_volume
docker network rm app_net
```

---

## 🚀 Next Steps (Optional)

* Convert this project to **docker-compose**
* Add a **database container**
* Introduce **multiple networks**
* Compare with **Kubernetes Persistent Volumes**
* Add logging/monitoring

---

## 🎯 Final Takeaway

> **Docker works because it separates concerns:**
>
> * Compute → Containers
> * Storage → Volumes
> * Communication → Networks

Master these three, and Docker becomes simple.
