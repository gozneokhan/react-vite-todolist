import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
    const [search, setSearch] = useState('');

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getFilteredData = () => {
        if (search === '') {
            return todos;
        }
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    };

    const filteredTodos = getFilteredData();

    // 첫 번째 : 콜백 / 두 번째: 의존성배열 : deps
    const { totalCount, doneCount, notNDoneCount } = useMemo(() => {
        console.log('getAnalyzedData 호출!');
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notNDoneCount = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notNDoneCount,
        };
    }, [todos]);

    // const getAnalyzedData = () => {
    //     console.log('getAnalyzedData 호출!');
    //     const totalCount = todos.length;
    //     const doneCount = todos.filter((todo) => todo.isDone).length;
    //     const notNDoneCount = totalCount - doneCount;

    //     return {
    //         totalCount,
    //         doneCount,
    //         notNDoneCount,
    //     };
    // };

    // const { totalCount, doneCount, notNDoneCount } = getAnalyzedData();

    return (
        <div className="List">
            <h4>Todo List🌿</h4>
            <div>
                <div>total: {totalCount}</div>
                <div>done: {doneCount}</div>
                <div>notDone: {notNDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
            <div className="todos_wrapper">
                {filteredTodos.map((todo) => {
                    return <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />;
                })}
            </div>
        </div>
    );
};
export default List;
