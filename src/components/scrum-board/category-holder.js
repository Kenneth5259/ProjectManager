import React from 'react';

const CategoryHolder = (categories) => {
    categories = categories.sort((cat1, cat2) => {
        return cat1.title > cat2.title ? 1 : -1;
    });
    return categories.map( (category) => {
        return (
          <div key={Math.random()} className='task' style={{backgroundColor: `${category.color}`}}>
            <h1 className='task__title'>{category.title}</h1>
          </div>
        );
    });
}

export default CategoryHolder;