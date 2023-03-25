/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Task } from '../types';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
};

export function TaskList({ tasks }: TaskListProps): JSX.Element {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => <TaskItem key={item.id} task={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.emptyList}>
          <Text>Nenhuma tarefa encontrada</Text>
        </View>
      }
      keyExtractor={(item) => String(item.id)}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 12,
  },
  emptyList: {
    width: '100%',
    paddingVertical: 24,
    alignItems: 'center',
  },
});
