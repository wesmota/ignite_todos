import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // encontrar tarefa com o mesmo nome
    const taskExists = tasks.find((task) => task.title === newTaskTitle);
    if (taskExists) {
      Alert.alert(
        "Task já existe",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      setTasks([
        ...tasks,
        { id: Math.random(), title: newTaskTitle, done: false },
      ]);
    }
  }

  function handlEditTask(taskId: number, taskNewTitle: string) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: taskNewTitle } : task
      )
    );
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert("Ação", "Tem certeza que você deseja remover esse item?", [
      {
        text: "Não",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          setTasks(tasks.filter((task) => task.id !== id));
          console.log("OK Pressed");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handlEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
