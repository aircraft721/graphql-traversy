const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const _ = require('lodash');

//Hardcoded data
// const customers = [
//     {id: '1', name: 'Jonh', email: 'joh.e@fff.com', age: 35},
//     {id: '2', name: 'Dan', email: 'dan.e@fff.com', age: 25},
//     {id: '3', name: 'Satan', email: 'satan.e@fff.com', age: 335}
// ];

//Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})


//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parentValue, args){
                // return _.find(customers, {id: args.id});
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers')
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})