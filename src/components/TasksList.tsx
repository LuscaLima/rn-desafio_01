import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { ItemWrapper } from "./ItemWrapper";

import { TasksItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskEditArg {
  id: number;
  newTaskTitle: string;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  editTask: ({ id, newTaskTitle }: TaskEditArg) => void;
  removeTask: (id: number) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  editTask,
  removeTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TasksItem
              item={item}
              index={index}
              toggleTaskDone={toggleTaskDone}
              editTask={editTask}
              removeTask={removeTask}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
