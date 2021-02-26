import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	let list = ["make the bed", "wash my hands", "walk the dog"];
	const [todoList, updateTodos] = useState(list);
	let addTask = e => {
		console.log(e);
		if (e.keyCode == 13) {
			let userTask = e.target.value;
			let newList = [...todoList, userTask];
			updateTodos(newList);
			e.target.value = "";
		}
	};
	let deleteTask = i => {
		let updatedList = todoList.filter((element, index) => index !== i);
		updateTodos(updatedList);
	};
	return (
		<div>
			<div className="container">
				<h1>todos</h1>

				<div className="todo-list">
					<input
						type="text"
						name="task"
						placeholder={
							todoList.length == 0
								? "No tasks, add a task"
								: "what needs to be done?"
						}
						onKeyDown={addTask}
					/>
					<ul>
						{todoList.map((todo, index) => (
							<li className="todo-item" key={index}>
								{todo}{" "}
								<button
									className="delete"
									onClick={() => deleteTask(index)}>
									x
								</button>
							</li>
						))}
					</ul>
					<p> {todoList.length} items left</p>
				</div>
			</div>
		</div>
	);
}
