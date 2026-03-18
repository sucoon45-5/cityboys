# Deployment Guide for City Boy Movement Website

This project is optimized for shared hosting environments like **Namecheap**, **GoDaddy**, or any **cPanel** based host that supports Node.js.

## Prerequisites
1. A cPanel account with "Setup Node.js App" capability.
2. A MySQL database created via cPanel "MySQL Database Wizard".

## Deployment Steps

### 1. Database Setup
1. Log in to cPanel.
2. Open **MySQL Databases**.
3. Create a database named `cityboyz_db`.
4. Create a user, assign a password, and add the user to the database with **ALL PRIVILEGES**.
5. Open **phpMyAdmin**.
6. Select `cityboyz_db` and click **Import**.
7. Upload and execute the `database.sql` file provided in the project root.

### 2. File Upload
1. Zip the project files (excluding `node_modules`).
2. Use cPanel **File Manager** to upload the zip to your home directory or a specific folder.
3. Extract the files.

### 3. Node.js Application Setup
1. Open **Setup Node.js App** in cPanel.
2. Click **Create Application**.
3. **Node.js version**: Select 16.x or 18.x.
4. **Application mode**: Production.
5. **Application root**: The folder where you extracted the files (e.g., `cityboyz`).
6. **Application URL**: Your domain (e.g., `cityboyz.com.ng`).
7. **Application startup file**: `server.js`.
8. Click **Create**.

### 4. Environment Variables
In the same "Setup Node.js App" interface, add the following variables:
- `PORT`: 5000 (usually handled by cPanel, but good to have)
- `DB_HOST`: localhost
- `DB_USER`: [Your MySQL Username]
- `DB_PASS`: [Your MySQL Password]
- `DB_NAME`: [Your MySQL Database Name]
- `JWT_SECRET`: [A long random string]
- `NODE_ENV`: production

### 5. Install Dependencies
1. Scroll down to the **Run JS script** section.
2. Click **Run npm install**.
3. Once finished, click **Restart** at the top.

## Accessing the Website
- **Frontend**: `http://yourdomain.com/`
- **Registration**: `http://yourdomain.com/register.html`
- **Admin Dashboard**: `http://yourdomain.com/admin.html` (Requires login)

> [!NOTE]
> For standard Apache-only hosting (no Node.js support), you would need to host the backend separately and point the frontend `fetch` calls to the API URL. This setup assumes Node.js support.
