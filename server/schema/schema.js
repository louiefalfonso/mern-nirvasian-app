import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

//mongoose models
import  Project  from "../models/Project.js";
import  Client from "../models/Client.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

//Types
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    role: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      role: { type: GraphQLString },
      status: { type: GraphQLString },
    },
  }),
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      role: { type: GraphQLString },
      status: { type: GraphQLString },
    },
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sku: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLString },
    quantity: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

//Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Product.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: (parent, args) => {
        return Product.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Client.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return Client.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return Project.find();
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Order.findById(args.id);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: (parent, args) => {
        return Order.find();
      },
    },
  },
});

//Enums
const ProjectStatusEnum = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    NEW: { value: "Not Started" },
    PROGRESS: { value: "In Progress" },
    COMPLETED: { value: "Completed" },
  },
});

const ClientActivityEnum = new GraphQLEnumType({
  name: "ClientActivity",
  values: {
    TEMP: { value: "Temporary" },
    ACTIVE: { value: "Active" },
    INACTIVE: { value: "In Active" },
  },
});

const OrderStatusEnum = new GraphQLEnumType({
  name: "OrderStatus",
  values: {
    PREPARED: { value: "Prepared" },
    CONSIGN: { value: "Consigned" },
    DISPATCH: { value: "Dispatched" },
    SHIPPED: { value: "Shipped" },
  },
});

const ProductStatusEnum = new GraphQLEnumType({
  name: "ProductStatus",
  values: {
    INSTOCK: { value: "In Stock" },
    NOSTOCK: { value: "Out Of Stock" },
  },
});

const ProductTypeEnum = new GraphQLEnumType({
  name: "ProductType",
  values: {
    RAW: { value: "Raw Materials" },
    FINISHED: { value: "Finished Goods" },
    PERISHABLE: { value: "Perishable Goods" },
    HAZARDOUS: { value: "Hazardous Materials" },
    HIGHVALUE: { value: "High-Value Goods" },
    OTHERS: { value: "Others" },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        role: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: ClientActivityEnum,
          defaultValue: "TEMP",
        },
      },
      resolve: (parent, args) => {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
          role: args.role,
          status: args.status,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        Project.deleteMany({ clientId: args.id });
        return Client.findByIdAndDelete(args.id);
      },
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        role: { type: GraphQLString },
        status: {
          type: ClientActivityEnum,
          defaultValue: "TEMP",
        },
      },
      resolve: (parent, args) => {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
              role: args.role,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: ProjectStatusEnum,
          defaultValue: "NEW",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: ProjectStatusEnum,
          defaultValue: "NEW",
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    addOrder: {
      type: OrderType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: OrderStatusEnum,
          defaultValue: "PREPARED",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const order = new Order({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return order.save();
      },
    },
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: OrderStatusEnum,
          defaultValue: "PREPARED",
        },
      },
      resolve(parent, args) {
        return Order.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Order.findByIdAndDelete(args.id);
      },
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        sku: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        amount: { type: GraphQLNonNull(GraphQLString) },
        quantity: { type: GraphQLNonNull(GraphQLString) },
        type: {
          type: ProductTypeEnum,
          defaultValue: "RAW",
        },
        status: {
          type: ProductStatusEnum,
          defaultValue: "INSTOCK",
        },
      },
      resolve: (parent, args) => {
        const product = new Product({
          name: args.name,
          sku: args.sku,
          description: args.description,
          quantity: args.quantity,
          amount: args.amount,
          status: args.status,
          type: args.type,
        });
        return product.save();
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        sku: { type: GraphQLString },
        description: { type: GraphQLString },
        amount: { type: GraphQLString },
        quantity: { type: GraphQLString },
        type: {
          type: ProductTypeEnum,
          defaultValue: "RAW",
        },
        status: {
          type: ProductStatusEnum,
          defaultValue: "INSTOCK",
        },
      },
      resolve(parent, args) {
        return Product.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              sku: args.sku,
              description: args.description,
              amount: args.amount,
              quantity: args.quantity,
              type: args.type,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Product.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});

export default schema;
