const { GraphQLServer } = require('graphql-yoga')

/**
 * Basic Server GraphqlYoga
 */

/*
const typeDefs = `
type Query {
  description: String
}
`

const resolvers = {
  Query: {
    description: () => `This is the API for a simple blogging application`
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000`));
*/

/**
 * Simple Todo Server GraphqlYoga
 */

let count = 5;
let todos = [{
  id: '0',
  content: 'Buy milk',
  isCompleted: true
},
{
  id: '1',
  content: 'Cook some lobster',
  isCompleted: false
},
{
  id: '2',
  content: 'Wash carpet',
  isCompleted: false
},
{
  id: '3',
  content: 'Take out trash bag',
  isCompleted: false
},
{
  id: '4',
  content: 'Buy bread',
  isCompleted: true
}];

const typeDefs = `
  type Todo {
    id: ID!
    content: String!
    isCompleted: Boolean!
  }
  type Query {
    allTodos: [Todo!]!
    Todo(id: ID!): Todo!
  }
  type Mutation {
    createTodo(content: String!, isCompleted: Boolean!): Todo!
    updateTodo(id: ID!, content: String, isCompleted: Boolean): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

const resolvers = {
  Query: {
    allTodos: () => {
      return todos;
    },
    Todo: (_, { id }) => {
      const todo = todos.find(x => x.id === id);
      if (!todo) {
        throw new Error('Cannot find your todo!');
      }
      return todo;
    }
  },
  Mutation: {
    createTodo: (_, { content, isCompleted }) => {
      let id = count++;

      const newTodo = {
        id: id.toString(),
        content,
        isCompleted
      }
      
      todos = [...todos, newTodo];
      
      return newTodo;
    },
    updateTodo: (_, { id, content, isCompleted }) => {
      let updatedTodo;
      
      todos = todos.map(todo => {
        if (todo.id === id) {
          updatedTodo = {
            id: todo.id,
            // for content and isCompleted, we first check if values are provided
            content: content !== undefined ? content : todo.content,
            isCompleted: isCompleted !== undefined ? isCompleted : todo.isCompleted
          }
          return updatedTodo;
        } 
        else {
          return todo
        }
      });

      return updatedTodo;
    },
    deleteTodo: (_, { id }) => {
      const todoToDelete = todos.find(x => x.id === id);

      todos = todos.filter(todo => {
        return todo.id !== todoToDelete.id;
      });

      return todoToDelete;
    }
  }
}

const options = {
    port: 7000,
    endpoint: '/graphql'
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(options, ({port, endpoint}) => console.log(`The server is running on http://localhost:${port}${endpoint}`));