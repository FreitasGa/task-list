/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';

import { TaskToCreate } from '../types';

type NewTaskFormProps = {
  onSubmit: (task: TaskToCreate) => void;
};

export function NewTaskForm({ onSubmit }: NewTaskFormProps): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [finishedDate, setFinishedDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  function handleDatePickerOpen(): void {
    setIsDatePickerOpen(true);
  }

  function handleDatePickerClose(): void {
    setIsDatePickerOpen(false);
  }

  function handleSubmit(): void {
    if (!title || !description || !finishedDate) {
      setError('Preencha todos os campos');
      return;
    }

    const taskToCreate: TaskToCreate = {
      title,
      description,
      finishedDate,
    };

    onSubmit(taskToCreate);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Tarefa</Text>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={{ ...styles.input, height: 100 }}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.label}>Data de conclusão</Text>
        <Pressable onPress={handleDatePickerOpen}>
          <TextInput
            style={styles.input}
            value={format(finishedDate, 'dd/MM/yyyy')}
            editable={false}
          />
        </Pressable>
        <DatePicker
          modal
          mode="date"
          locale="pt-BR"
          open={isDatePickerOpen}
          date={finishedDate}
          onConfirm={(date) => {
            handleDatePickerClose();
            setFinishedDate(date);
          }}
          onCancel={handleDatePickerClose}
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  wrapper: {
    marginBottom: 12,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderRadius: 5,
    color: '#000',
    fontSize: 16,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderColor: '#555',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 8,
    alignSelf: 'center',
  },
});
