import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList, TaskEditArg } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
    function createExistingTaskAlert() {
      Alert.alert('Tarefa já cadastrada', 'Você não pode cadastrar uma mesma tarefa múltiplas vezes')
    }

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title.toLowerCase() === newTaskTitle.toLowerCase())) {
      createExistingTaskAlert()
      return
    }
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      done: false
    }

    setTasks(old => [...old, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const task = updatedTasks.find(task => task.id === id)

    if (task) {
      task.done = !task.done
    }

    setTasks(updatedTasks)
  }

  function handleEditTask({ id, newTaskTitle }: TaskEditArg) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const task = updatedTasks.find(task => task.id === id)

    if (task) {
      task.title = newTaskTitle
    }

    setTasks(updatedTasks)
  }

  function createConfirmRemoveAlert(id: number) {
    Alert.alert(
      'Remover tarefa',
      'Tem certeza que você deseja remover esta tarefa?',
      [
        {
          text: 'Não',
          style: "cancel"
        },
        {
          text: 'Sim',
          onPress: () => setTasks(old => old.filter(task => task.id !== id))
        }
    ])
  }

  function handleRemoveTask(id: number) {
    createConfirmRemoveAlert(id)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
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