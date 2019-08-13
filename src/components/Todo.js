import React from 'react';
import axios from '../axios-orders';
import { Button } from 'reactstrap';

export default class extends React.Component {

    constructor() {
        super();

        this.state = {
            list: [],
            title: '',
            allTasksCount: 0,
            doneTasksCount: 0
        };
    }

    componentDidMount() {
        axios.get(`${axios.defaults.baseURL}${this.props.day}.json`)
            .then(response => {
                if (response.data === null) {
                    this.setState({
                        list: [],
                        allTasksCount: 0,
                        doneTasksCount: 0
                    });
                }
                else {
                    this.setState({
                        list: response.data,
                        allTasksCount: response.data.length,
                        doneTasksCount: response.data.filter(i => i.complete === true).length
                    });
                }


            });

    }

    changeTitle(title) {
        this.setState({ title });
    }

    putToDB = (list) => {
        axios.put(`/${this.props.day}.json`, list)
            .then(responce => console.log(responce))
            .catch(error => console.log(error));
    }

    addTask = () => {
        if (this.state.title.trim() !== '') {

            const task = {
                value: this.state.title,
                complete: false
            }

            let newList = [...this.state.list, task];

            this.setState({
                list: newList,
                allTasksCount: newList.length,
                title: '',
            });

            this.putToDB(newList);


        }

    }

    removeTask(i) {
        let newList = [...this.state.list];
        let newDoneTasksCount = this.state.doneTasksCount;

        let removingTask = newList[i];
        if (removingTask.complete === true) {
            newDoneTasksCount--;
        }

        newList.splice(i, 1);

        this.setState({
            list: newList,
            doneTasksCount: newDoneTasksCount,
            allTasksCount: newList.length,
        });

        this.putToDB(newList);
    }

    markAsDoneTask(i) {
        let newList = [...this.state.list];
        let currentTask = newList[i];
        let newDoneTasksCount = this.state.doneTasksCount;

        if (currentTask.complete === false) {

            currentTask.complete = true;
            newDoneTasksCount++;
        }
        else {
            currentTask.complete = false;
            newDoneTasksCount--;
        }

        newList.splice(i, 1, currentTask);

        this.setState({
            list: newList,
            doneTasksCount: newDoneTasksCount,
        });

        this.putToDB(newList);

    }

    render() {

        let listLi = this.state.list.map((el, i) => {
            return <li
                style={{
                    textDecoration: el.complete ? 'line-through' : '',
                    color: el.complete ? '#ABB8C3' : ''
                }}
                key={i}
                onAuxClick={() => this.removeTask(i)}
                onClick={() => this.markAsDoneTask(i)}>
                {el.value}
            </li>
        });

        return (
            <div style={{ margin: 10 }}>
                <p>{this.props.day}</p>
                <p>Progress: {this.state.doneTasksCount} / {this.state.allTasksCount}</p>
                <div class="row">

                    <div class="input-group mb-3">
                        <input type='text'
                        class="form-control"
                        placeholder="Задачка"
                        value={this.state.title} onChange={(e) => this.changeTitle(e.target.value)} />
                        <div class="input-group-append">
                            <button
                                type="button"
                                class="btn btn-outline-success"
                                onClick={this.addTask}
                                style={{ float: "right" }}>Dobavit'</button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <ul>
                        {listLi}
                    </ul>
                </div>
            </div>
        );
    }

}