import { Service, ServicePlugin } from '@nix2/service-core';

import { GraphQLService } from '..';

/**
 * Class to represent a GraphQL plugin.
 * @class GraphQLPlugin
 */
export default class GraphQLPlugin extends ServicePlugin {
    static NAME = 'graphql';
    static LABEL = 'GraphQL';

    /**
     * Return the services for the GraphQL Plugin.
     * @function getServices
     * @memberof GraphQLPlugin
     * @static
     * @returns {typeof Service[]} GraphQL Service.
     */
    static getServices(): typeof Service[] {
        // @ts-expect-error The `GraphQLService` does not have a `type` param so it does not match that shape of `Service`.
        return [GraphQLService];
    }
}
