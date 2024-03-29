export default `import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Query, Resolver } from "type-graphql";

/**
 * Resolver for Hello.
 */
@Resolver()
class HelloResolver {
    /**
     * Return hi world.
     * @returns {string} Hi World.
     */
    @Query(() => String)
    async hello() {
        return 'hi world';
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const apolloServer = new ApolloServer({ schema });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("started");
    });
};

main();
`;
