import React from 'react';

import Task from './task';

let TaskHolder = (tasks, categories, onDragStart) => {
    tasks = tasks.sort((task1, task2) => {
      return task1.category > task2.category ? 1 : -1;
    })
    let tasksHolder = {};
    if(tasks){
        tasks.map((task) => {
          let tempCat = categories.slice();
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
          tasksHolder[task.column].push(
              <Task 
                id={task.id}
                title={task.title}
                description={task.description}
                draggable={true}
                backgroundColor={backgroundColor}
                onDragStart={onDragStart}
              />
          )
        });
    }
    return tasksHolder;
}

export default TaskHolder;