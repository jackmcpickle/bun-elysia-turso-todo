import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { serverTiming } from '@elysiajs/server-timing';
import { staticPlugin } from '@elysiajs/static';

import { Layout, RenderTodos, Todo, TodoForm } from './templates';
import {
    createTodo,
    deleteTodo,
    getAllTodos,
    getTodo,
    toggleCompleteTodo,
    updateTodo,
} from './db/todo';

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .use(serverTiming())
    .use(
        staticPlugin({
            resolve: (path) => path.replace(/^\/public/, ''),
        }),
    )
    .use(html())
    .trace(async ({ handle, request }) => {
        const { time, end, name: handleName } = await handle;
        const { name } = await request;

        console.log(
            name,
            `beforeHandle took: ${handleName}`,
            ((await end) - time).toFixed(3),
        );
    })
    .get('/ping', () => 'pong')
    .get('/', async () => {
        const todos = await getAllTodos();
        return (
            <Layout>
                <>
                    <h2 class='text-lg font-semibold leading-8 text-gray-900'>
                        Create todo
                    </h2>
                    <TodoForm />
                    <h2 class='text-lg font-semibold leading-8 text-gray-900'>
                        List
                    </h2>
                    <RenderTodos todos={todos} />
                </>
            </Layout>
        );
    })
    .get(
        '/api/todos/:id',
        async ({ params }) => await getTodo(Number(params.id)),
    )
    .delete(
        '/api/todos/:id',
        async ({ params }) => await deleteTodo(Number(params.id)),
    )
    .put('/api/todos/:id/complete', async ({ params }) => {
        const data = await toggleCompleteTodo(Number(params.id));
        console.log({ todo: data[0].todo });
        return <Todo todo={data[0].todo} />;
    })
    .put(
        '/api/todos/:id',
        async ({ body, params }) => {
            const data = await updateTodo(Number(params.id), body.name);
            console.log({ todo: data[0].todo });
            return <Todo todo={data[0].todo} />;
        },
        {
            body: t.Object({
                name: t.String(),
            }),
        },
    )
    .get('/api/todos', getAllTodos)
    .post(
        '/api/todos',
        async ({ body }) => {
            await createTodo(body);
            return <RenderTodos todos={await getAllTodos()} />;
        },
        {
            body: t.Object({
                name: t.String(),
            }),
        },
    )
    .listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
