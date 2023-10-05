const connection = require('../config');

class TaskModel {

static getAllTasks(page, pageSize, callback) {
    const offset = (page - 1) * pageSize;
    const query = `SELECT * FROM tasks LIMIT ? OFFSET ?`;

    connection.query(query, [pageSize, offset], (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    });
  }

static createTask(newTask, callback) {
    const query = 'INSERT INTO tasks (title, description, status, task_added_on, task_updated_on) VALUES (?, ?, ?, ?, ?)';
    const { title, description, status, task_added_on, task_updated_on } = newTask;
  
    connection.query(query, [title, description, status, task_added_on, task_updated_on], (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    });
}  

static updateTask(taskId, updatedTask, callback) {
  const query = 'UPDATE tasks SET title=?, description=?, status=?, task_added_on=?, task_updated_on=? WHERE id=?';
  const { title, description, status, task_added_on, task_updated_on } = updatedTask;

  connection.query(query, [title, description, status, task_added_on, task_updated_on, taskId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

  static getTaskMetricsByStatus(callback) {
    const query = `
      SELECT 
        COUNT(CASE WHEN status = 'Open' THEN 1 END) as open_tasks,
        COUNT(CASE WHEN status = 'InProgress' THEN 1 END) as inprogress_tasks,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed_tasks
      FROM tasks;
    `;

    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results[0]);
    });
  }

  static getTaskMetricsByTimeline(callback) {
    const query = `
      SELECT 
        DATE_FORMAT(task_updated_on, '%M %Y') as month_year,
        COUNT(CASE WHEN status = 'Open' THEN 1 END) as open_tasks,
        COUNT(CASE WHEN status = 'InProgress' THEN 1 END) as inprogress_tasks,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed_tasks
      FROM tasks
      GROUP BY month_year
      ORDER BY month_year;
    `;

    connection.query(query, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = TaskModel;
