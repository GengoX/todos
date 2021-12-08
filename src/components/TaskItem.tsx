import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconAnt from 'react-native-vector-icons/AntDesign';

export interface Task {
    id: number;
    title: string;
    done: boolean;
};

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({
    task,
    editTask,
    toggleTaskDone,
    removeTask
}: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskNewTitleValue(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, taskNewTitleValue);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => {
                        toggleTaskDone(task.id);
                    }}
                    disabled={isEditing}
                >
                    <View
                        style={
                            task.done
                                ? styles.taskMarkerDone
                                : styles.taskMarker
                        }
                    >
                        {task.done && (
                            <Icon name="check" size={12} color="#FFF" />
                        )}
                    </View>
                    <TextInput
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={
                            task.done ? styles.taskTextDone : styles.taskText
                        }
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={() => {
                            handleCancelEditing();
                        }}
                    >
                        <Icon name="x" size={24} color="#ff7675" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            handleStartEditing();
                        }}
                    >
                        <IconAnt name="edit" size={24} color="#54a0ff" />
                    </TouchableOpacity>
                )}

                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    onPress={() => {
                        removeTask(task.id);
                    }}
                    disabled={isEditing}
                >
                    <IconAnt
                        name="delete"
                        size={24}
                        color="#ff7675"
                        style={{ opacity: isEditing ? 0.2 : 1 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoContainer: {
        flex: 1
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        maxWidth: 268,
        color: '#718093',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        maxWidth: 268,
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 8
    }
});