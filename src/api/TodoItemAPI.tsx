import axios from 'axios';

// APIのURL
const TODO_API_URL = "http://localhost:3001/todos/";

// TODOアイテムAPI用プロパティ
type TodoItemAPIProps = {
    id: number;
    name: string;
    isCompleted: boolean;
}

/**
 * TODOアイテム　POST用API
 * @param todo - POSTするTODOアイテム
 * @returns Promise<void>
 */
export const postTodoAPI = async (todo: TodoItemAPIProps): Promise<void> => {
    await axios
        .post(`${TODO_API_URL}`, todo)
        .catch((error) => {
            console.error(error);
        });
};

/**
 * TODOアイテム　PATCH用API
 * @param todoId - PATCHするTODOアイテムのID
 * @param val - PATCHするTODOアイテムの値
 * @returns Promise<void>
 */
export const patchTodoAPI = async (todoId: number, val: string | boolean): Promise<void> => {
    if (typeof val === "string") {
        await axios
            .patch(`${TODO_API_URL}${todoId}`, { name: val })
            .catch((error) => {
                console.error(error);
            });
    } else if (typeof val === "boolean") {
        await axios
            .patch(`${TODO_API_URL}${todoId}`, { isCompleted: val })
            .catch((error) => {
                console.error(error);
            });
    }
};

/**
 * TODOアイテム　DELETE用API
 * @param todoId - DELETEするTODOアイテムのID
 * @returns Promise<void>
 */
export const deleteTodoAPI = async (todoId: number): Promise<void> => {
    await axios
        .delete(`${TODO_API_URL}${todoId}`)
        .catch((error) => {
            console.error(error);
        });
};

/**
 * TODOアイテム　取得API
 * @param andParam - 絞り込みパラメータ
 * @returns Promise<TodoItemAPIProps[]>
 */
export const getTodoAPI = async (andParam?: boolean): Promise<TodoItemAPIProps[]> => {
    try {
        let params = {};
        if (andParam !== undefined) {
            params = { isCompleted: andParam };
        }
        const response = await axios.get(TODO_API_URL, { params });
        if (response) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};
