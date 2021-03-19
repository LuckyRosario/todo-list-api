import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let url = "https://assets.breatheco.de/apis/fake/todos/user/lady3ug";
	let list = ["make the bed", "wash my hands", "walk the dog"];
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	//	let addTask = e => {
	//		if (e.keyCode == 13) {
	//			let userTask = e.target.value;
	//			let newList = [...tasks, userTask];
	//			setTasks(newList);
	//			e.target.value = "";
	//		}
	//	};
	let deleteTask = i => {
		let updatedList = tasks.filter((element, index) => index !== i);
		fetch(url, {
			method: "put",
			body: JSON.stringify(updatedList),
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(() => getTodos())
			.catch(error => console.log(error));
	};
	// 	let deleteTask = () => {
	// 	let newTasks = tasks.filter(task => task.id != id);
	// 	this.set;
	// };
	const getTodos = () => {
		fetch(url)
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				setTasks(data);
			})
			.catch(error => {
				console.log(error);
			});
	};
	useEffect(() => {
		getTodos();
	}, []);

	const addTask = e => {
		// e.preventDefault();
		// if (e.keyCode === 13) {
		const newTask = { label: task, done: false };
		const updatedList = [...tasks, newTask];
		console.log(e);
		fetch(url, {
			method: "put",
			body: JSON.stringify(updatedList),
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(() => getTodos())
			.catch(error => console.log(error));
		// }
	};

	return (
		<div>
			<div className="container">
				<h1>todos</h1>

				{/* <div className="todo-list" onSubmit={e => addTask(e)}> */}
				<div className="todo-list">
					<input
						type="text"
						onChange={e => setTask(e.target.value)}
						name="task"
						placeholder={
							tasks.length == 0
								? "No tasks, add a task"
								: "what needs to be done?"
						}
						value={task}
						onKeyUp={e => {
							//listen to the key up and wait for the return key to be pressed (Key === 'Enter')
							if (e.key === "Enter") {
								addTask();
							}
						}}
					/>
					<ul>
						{tasks.map((todo, index) => (
							<li className="todo-item" key={index}>
								{todo.label}
								<button
									className="delete"
									onClick={() => deleteTask(index)}>
									<i className="fas fa-trash" />
								</button>
							</li>
						))}
					</ul>
					<p> {tasks.length} items left</p>
				</div>
			</div>
		</div>
	);
}
