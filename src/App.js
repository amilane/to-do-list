import React from 'react';
import Todo from './components/Todo';


function App() {
  return (

    <div className="App" class="container">
      <div class="row justify-content-around" >
      <div class="col-sm-3">
        <Todo day='Monday'></Todo>
      </div>
      <div class="col-sm-3">
        <Todo day='Tuesday'></Todo>
      </div>
      <div class="col-sm-3">
        <Todo day='Wednesday'></Todo>
      </div>
      <div class="col-sm-3">
        <Todo day='Thursday'></Todo>
      </div>
      <div class="col-sm-3">
        <Todo day='Friday'></Todo>
      </div>
      <div class="col-sm-3">
        <Todo day='Saturday'></Todo>
      </div>
      <div class="col-sm-3">
        <Todo day='Sunday'></Todo>
      </div>
      </div>


    </div>

  );
}

export default App;
