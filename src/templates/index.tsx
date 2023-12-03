import { Todo } from '../types';
import { cn } from '../utils/className';

export function Layout({ children }: { children: JSX.Element }) {
    return (
        <html lang='en'>
            <head>
                <title>Hello World</title>
                <link
                    rel='stylesheet'
                    href='/public/styles.css'
                />
                <script
                    src='https://unpkg.com/htmx.org@1.9.9'
                    integrity='sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX'
                    crossorigin='anonymous'
                ></script>
                <meta
                    name='htmx-config'
                    content='{"includeIndicatorStyles": false}'
                />
            </head>
            <body>
                <main class='px-4 max-w-4xl mx-auto'>{children}</main>
            </body>
        </html>
    );
}

export function TodoForm() {
    return (
        <form
            hx-post='/api/todos'
            hx-target='#todos-list'
            hx-swap='outerHTML'
            class='my-4 flex gap-4 bg-base-200'
        >
            <input
                type='text'
                name='name'
                placeholder='Todo name'
                class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <button
                class='flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
                type='submit'
            >
                Create
            </button>
        </form>
    );
}

export function RenderTodos({ todos }: { todos: Todo[] }) {
    return (
        <div
            class='grid grid-cols-1 gap-4 my-4 py-4 border-t border-b border-gray-300'
            id='todos-list'
        >
            {todos.map((todo) => (
                <Todo todo={todo} />
            ))}
        </div>
    );
}

export function Todo({ todo }: { todo: Todo }) {
    return (
        <div
            id={`todo-${todo.id}`}
            class='flex gap-6 justify-between'
        >
            <input
                hx-put={`/api/todos/${todo.id}`}
                hx-trigger='keyup changed delay:500ms'
                hx-swap='outerHTML'
                hx-target={`#todo-${todo.id}`}
                type='text'
                name='name'
                autofocus='autofocus'
                hx-indicator={`#todo-${todo.id}`}
                class='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:text-gray-700'
                value={todo.name}
                disabled={!!todo.completed}
            />
            <div class='flex gap-2'>
                <button
                    hx-put={`/api/todos/${todo.id}/complete`}
                    hx-trigger='click'
                    hx-swap='outerHTML'
                    hx-target={`#todo-${todo.id}`}
                    class='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                >
                    <SpinnerIcon className='htmx-indicator' />
                    <span class='htmx-request:hidden'>
                        {!todo.completed ? 'complete' : 'undo'}
                    </span>
                </button>
                <button
                    class='flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                    hx-swap='delete'
                    hx-target={`#todo-${todo.id}`}
                    hx-delete={`/api/todos/${todo.id}`}
                    hx-confirm='Are you sure you wish to delete this todo?'
                >
                    <SpinnerIcon className='htmx-indicator' />
                    <TrashIcon className='htmx-request:hidden' />
                </button>
            </div>
        </div>
    );
}

export function SpinnerIcon({ className }: { className?: string }) {
    return (
        <svg
            class={cn('animate-spin-fast w-6 h-6', className)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
        >
            <circle
                class='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
            ></circle>
            <path
                class='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
        </svg>
    );
}

export function TrashIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            class={cn('w-6 h-6', className)}
        >
            <path
                fillRule='evenodd'
                d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                clipRule='evenodd'
            />
        </svg>
    );
}
