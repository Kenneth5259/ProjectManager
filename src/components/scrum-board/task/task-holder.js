import React from 'react';

import Task from './task';

let TaskHolder = (tasks, categories, onDragStart, completeTask, deleteTask, filter, projectId, forceRender) => {
    let filterBool = (filter ==='*') ? false : true;

    if(tasks) {
      tasks = tasks.sort((task1, task2) => {
        return task1.category > task2.category ? 1 : -1;
      })
    }
    let tasksHolder = {};
    if(tasks){
        tasks.map((task) => {
          let tempCat = categories ? categories.slice() : [];
          let taskCat = tempCat.filter(cat => {
            return task.category === cat.title;
          });
          let backgroundColor = 'white';
          if(taskCat.length > 0) {
            backgroundColor = taskCat[0].color;
          }
    
          if(tasksHolder[task.column] === undefined) {
            tasksHolder[task.column] = [];
          }
          if(task.backlogged === false) {
            if(!filterBool || (task.category === filter)) {
              tasksHolder[task.column].push(
                <Task 
                  key={task._id}
                  id={task._id}
                  projectId={projectId}
                  title={task.title}
                  description={task.description}
                  category={task.category}
                  draggable={true}
                  backgroundColor={backgroundColor}
                  onDragStart={onDragStart}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  forceRender={forceRender}
                />
            )
            }
            
            }
        });
    }
    return tasksHolder;
}

export default TaskHolder;