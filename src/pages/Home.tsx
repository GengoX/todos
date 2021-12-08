import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { Task } from '../components/TaskItem';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existTask = tasks.map(task => ({ ...task }));
    const task = existTask.find(task => task.title === newTaskTitle);
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    if (task?.title === data.title) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
            onPress: () => { return; }
          }
        ],
        {
          cancelable: false
        }
      );
    } else {
      setTasks(oldState => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const toggleTask = updatedTasks.find(task => task.id === id);

    if (!toggleTask) {
      return;
    }

    toggleTask.done = !toggleTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks(oldState => oldState.filter(task => task.id !== id));
          }
        }
      ],
      {
        cancelable: true
      }
    );

  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTasks = tasks.map(task => ({ ...task }));
    const updateTask = updateTasks.find(task => task.id === taskId);

    if (!updateTask) {
      return;
    }

    updateTask.title = taskNewTitle;
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})