export type Todo = {
    id?: number,
    content: string
    state: string
}

export const State = {
    planning: '作業前',
    doing: '作業中',
    done: '完了'
}