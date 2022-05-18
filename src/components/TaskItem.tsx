import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import editIcon from "../assets/icons/edit/edit.png";
import cancelIcon from "../assets/icons/cancel/cancel.png";
import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskEditArg {
  id: number;
  newTaskTitle: string;
}

interface TasksItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: ({ id, newTaskTitle }: TaskEditArg) => void;
  removeTask: (id: number) => void;
}

export function TasksItem({
  item,
  index,
  toggleTaskDone,
  editTask,
  removeTask,
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditingTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ id: item.id, newTaskTitle: editingTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editingTitle}
            onChangeText={setEditingTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            style={{ paddingHorizontal: 28 }}
            onPress={handleCancelEditing}
          >
            <Image source={cancelIcon} style={{ marginTop: 5 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divider}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  actions: {
    flexDirection: "row",
  },
  divider: {
    width: 1,
    height: 24,
    marginLeft: -14,
    marginRight: -14,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  cancelIcon: {},
});
