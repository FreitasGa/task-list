import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { NewTaskForm } from '../components/NewTaskForm';
import { TaskList } from '../components/TaskList';

import { Task, TaskToCreate } from '../types';

export function Home(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ísModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sortedTasks = tasks.sort(
    (a, b) => a.finishedDate.getTime() - b.finishedDate.getTime(),
  );

  function handleModalOpen(): void {
    setIsModalOpen(true);
  }

  function handleModalClose(): void {
    setIsModalOpen(false);
  }

  function handleAddNewTask(taskToCreate: TaskToCreate): void {
    const task: Task = {
      id: tasks.length + 1,
      ...taskToCreate,
    };

    setTasks((oldTasks) => [...oldTasks, task]);
    setIsModalOpen(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Tarefas</Text>
      </View>
      <View style={styles.body}>
        <TaskList tasks={sortedTasks} />
      </View>
      <Pressable onPress={handleModalOpen} style={styles.button}>
        <Text style={styles.buttonLabel}>Adicionar Tarefa</Text>
      </Pressable>
      <Modal
        visible={ísModalOpen}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <NewTaskForm onSubmit={handleAddNewTask} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  headerTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    height: '100%',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
