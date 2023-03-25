import { format } from 'date-fns';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Task } from '../types';

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps): JSX.Element {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function handleSelect(): void {
    setIsSelected((oldState) => !oldState);
  }

  return (
    <Pressable style={styles.container} onPress={handleSelect}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.finishedDate}>
          {format(task.finishedDate, 'dd/MM/yyyy')}
        </Text>
      </View>
      <View>
        <Text numberOfLines={isSelected ? undefined : 3} ellipsizeMode="tail">
          {task.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderColor: '#555',
    borderWidth: 1,
    marginHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  finishedDate: {
    color: '#555',
  },
});
