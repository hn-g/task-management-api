# Task Management API

## Objective

The objective of this project is to create a Task Management system with a set of APIs to perform (Create, Read, Update) operations on tasks. Additionally, it provides APIs to retrieve task metrics based on status and timeline.

## Table Structure

The database includes a single table `tasks` with the following structure:

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(11) NOT NULL,
  task_added_on DATE,
  task_updated_on DATE
);
```

## Setup

To set up and run the project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   ```

2. **Install Dependencies**

   ```bash
   cd task-management-api
   npm install
   ```

3. **Set Up MySQL Database**

   - Install MySQL on your system if you haven't already.
   - Create a database named `task_management_db`.
   - Update the database configuration in `config.js` with your MySQL credentials.

4. **Run the Application**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## APIs

### 1. Create a Task

- **Endpoint**: `POST /tasks`
- **Request Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "Open",
    "task_added_on": "2023-10-05",
    "task_updated_on": "2023-10-05"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task created successfully",
    "taskId": 1
  }
  ```

### 2. Update a Task

- **Endpoint**: `PUT /tasks/:taskId`
- **Request Body**:
  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "Completed",
    "task_updated_on": "2023-10-06"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task updated successfully"
  }
  ```

### 3. Get All Tasks (Paginated)

- **Endpoint**: `GET /tasks`
- **Query Parameters**:
  - `page` (Optional, default: 1): Page number.
  - `pageSize` (Optional, default: 10): Number of tasks per page.
- **Response**:
  ```json
  {
    "currentPage": 1,
    "pageSize": 10,
    "tasks": [
      {
        "id": 1,
        "title": "Task Title",
        "description": "Task Description",
        "status": "Open",
        "task_added_on": "2023-10-05",
        "task_updated_on": "2023-10-05"
      },
      // ...
    ]
  }
  ```

### 4. Get Task Metrics (Status Basis)

- **Endpoint**: `GET /tasks/metrics/status`
- **Response**:
  ```json
  {
    "open_tasks": 10,
    "inprogress_tasks": 30,
    "completed_tasks": 50
  }
  ```

### 5. Get Task Metrics (Timeline Basis)

- **Endpoint**: `GET /tasks/metrics/timeline`
- **Response**:
  ```json
  [
    {
      "date": "July 2023",
      "metrics": {
        "open_tasks": 0,
        "inprogress_tasks": 0,
        "completed_tasks": 30
      }
    },
    {
      "date": "August 2023",
      "metrics": {
        "open_tasks": 10,
        "inprogress_tasks": 30,
        "completed_tasks": 50
      }
    },
    // ...
  ]
  ```

## Additional Information

- Pagination is supported for the "Get All Tasks" API. You can use the `page` and `pageSize` query parameters to navigate through the tasks.

- The `status` field can take values 'Open', 'InProgress', or 'Completed' for each task.

- The `task_added_on` and `task_updated_on` fields represent the dates when the task was added and last updated, respectively.

- Have included "Sample data.csv" in shared folder for the data which was used for development and tesing.
