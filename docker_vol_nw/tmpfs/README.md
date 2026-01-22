# Docker tmpfs Mounts — Explanation & Hands-On Guide

This README explains **Docker tmpfs mounts** from intuition to technical definition, use cases, and practical examples.

---

## 1. One-Line Definition (Memorize This)

> **A tmpfs mount is an in-memory filesystem used for fast, temporary data that disappears when the container stops.**

---

## 2. The Mental Model That Sticks 🧠

### tmpfs = **Writing on a Whiteboard**

Think of three storage types:

- **Bind mount** → shared notebook (persistent, shared with host)
- **Volume** → hotel safe (persistent, Docker-managed)
- **tmpfs** → **whiteboard**

What happens with a whiteboard:
- Writing is fast
- Nothing is saved permanently
- When you leave the room → everything is erased

➡️ That is exactly how **tmpfs** works.

---

## 3. Technical Definition

A **tmpfs mount** is a filesystem that:
- Lives entirely in **RAM**
- Is **never written to disk**
- Is **removed automatically** when the container stops

**Formal definition:**

> In Docker, a tmpfs mount mounts a temporary filesystem backed by memory into a container, providing ephemeral storage that is deleted when the container exits.

---

## 4. Why tmpfs Mounts Are Used

### 1️⃣ Security
- Sensitive data never touches disk
- Automatically wiped on container stop

Used for:
- Secrets
- Tokens
- Passwords
- Cryptographic material

---

### 2️⃣ Performance
- RAM is faster than disk
- Ideal for high-frequency reads/writes

Used for:
- Caches
- Temporary computation files

---

### 3️⃣ Guaranteed Ephemeral Storage
- No risk of accidental persistence
- Data **must** die with the container

---

### 4️⃣ Reduced Disk I/O
- Avoids unnecessary disk writes
- Reduces SSD wear

---

### 5️⃣ Isolation
- No host filesystem exposure
- No Docker volume persistence

---

## 5. Basic tmpfs Example (Hands-On)

### Run a container with tmpfs

```bash
docker run -it --rm \
  --tmpfs /app/tmp \
  ubuntu \
  bash
````

---

### Inside the container

```bash
echo "super-secret-token" > /app/tmp/token.txt
ls /app/tmp
cat /app/tmp/token.txt
```

Output:

```
token.txt
super-secret-token
```

✔ Data exists
✔ Application can use it
✔ Stored only in memory

---

## 6. Verify It Is In-Memory

Inside the container:

```bash
df -h | grep tmpfs
```

Example output:

```
tmpfs   64M   0   64M   0%  /app/tmp
```

This confirms:

* Filesystem type = `tmpfs`
* Backed by RAM, not disk

---

## 7. Prove Data Is Deleted

Exit the container:

```bash
exit
```

Start a new container:

```bash
docker run -it --rm \
  --tmpfs /app/tmp \
  ubuntu \
  bash
```

Check the directory:

```bash
ls /app/tmp
```

Result:

```
(empty)
```

🔥 **All data is permanently gone.**

---

## 8. tmpfs with Size and Permissions

```bash
docker run -it --rm \
  --tmpfs /cache:rw,size=100m,mode=1777 \
  ubuntu \
  bash
```

### Common options

| Option | Description       |
| ------ | ----------------- |
| `size` | Maximum RAM usage |
| `rw`   | Read/write access |
| `mode` | File permissions  |

---

## 9. Real-World Use Cases

* `/tmp` directories
* Application caches
* Session storage
* Runtime secrets
* Build artifacts
* `/run` directories

---

## 10. When NOT to Use tmpfs ❌

* Large files
* Data that must survive restarts
* Memory-constrained systems
* Databases or logs requiring persistence

---

## 11. tmpfs vs Volume vs Bind Mount

| Type       | Backing             | Persists | Best For        |
| ---------- | ------------------- | -------- | --------------- |
| Bind Mount | Host disk           | ✅        | Development     |
| Volume     | Docker-managed disk | ✅        | Production data |
| tmpfs      | RAM                 | ❌        | Secrets, cache  |

---

## 12. Final Memory Hooks 🧠

* **Bind mount = window**
* **Volume = vault**
* **tmpfs = whiteboard**

---

## 13. One-Sentence Summary

> **tmpfs mounts provide fast, secure, disposable, in-memory storage for container data that must never be persisted to disk.**
