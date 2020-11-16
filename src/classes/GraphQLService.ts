/*
 * File: index.ts
 * Created: 10/14/2020 13:03:39
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */

import {
    ExecutionContext,
    Info,
    InitializeServiceDataType,
    Schema,
    SchemaType,
    User,
} from '@nix2/service-core';

import { GraphQLServiceType } from '..';
import { INDEX_TEMPLATE } from '../templates';
import { TypescriptService } from '@nix2/service-plugin-typescript';

type DependenciesType = Record<string, string>;

/**
 * Class for representing a GraphQL Service.
 * @class GraphQLService
 */
export default class GraphQLService extends TypescriptService {
    static NAME = 'graphql';
    static DIRNAME: string = __dirname;

    /**
     * Constructor for the GraphQL service.
     * @param {ExecutionContext} context Path to the service.yaml.
     * @param {Info}             info    Info of the service.
     * @param {Array<Schema>}    schemas List of service schemas.
     */
    constructor(context: ExecutionContext, info: Info, schemas: Schema[]) {
        // You need the any because for some reason,
        // private properties from the service-core are not considered the same.
        // It would be nice to fix this some time in the future but I don't think I can.
        // This is starting to show the limitations of OOP with TS. :/
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(context, info as any, 'graphql', schemas as any);
    }

    /**
     * Deserialize an object into an `GraphQLService` instance.
     * @function deserialize
     * @static
     * @memberof GraphQLService
     * @param   {ExecutionContext} context Path to the service.yaml.
     * @param   {object}           data    Javascript object of the `Info`.
     * @returns {GraphQLService}    Service object.
     */
    static deserialize(
        context: ExecutionContext,
        data: GraphQLServiceType,
    ): GraphQLService {
        // Test if the values are present
        const vals = ['info', 'schemas'];
        for (const val of vals) {
            if (Object.keys(data).indexOf(val) == -1)
                throw Error(val + ' not given');
        }

        return new GraphQLService(
            context,
            Info.deserialize(data.info),
            Object.values(data.schemas).map((schema: SchemaType) =>
                Schema.deserialize(schema),
            ),
        );
    }

    /**
     * Make a `GraphQLService` object.
     * @static
     * @param   {MakeObjectType}       data Data for the `GraphQLService` object.
     * @param   {User}                 user User instance.
     * @returns {GraphQLServiceType} New `GraphQLService` object.
     */
    static makeObject(
        data: InitializeServiceDataType,
        user: User | null,
    ): GraphQLServiceType {
        return {
            ...super.makeObject(data, user),
            ...{
                type: 'graphql',
            },
        };
    }

    /**
     * Serialize a `GraphQLService` instance into an object.
     * @function serialize
     * @memberof GraphQLService
     * @returns  {GraphQLServiceType} Javascript object.
     */
    serialize(): GraphQLServiceType {
        return {
            ...super.serialize(),
            ...{
                type: 'graphql',
            },
        };
    }

    /**
     * GraphQL specifc dependencies.
     * @memberof GraphQLService
     * @function dependencies
     * @returns {Record<string, string>} Object of package name and version.
     */
    get dependencies(): DependenciesType {
        return {
            ...super.dependencies,
            ...{
                'apollo-server-express': '^2.19.0',
                express: '^4.17.1',
                graphql: '^15.4.0',
                'reflect-metadata': '^0.1.13',
                'type-graphql': '^1.1.0',
                typeorm: '^0.2.29',
            },
        };
    }

    /**
     * Object of dev dependencies and their version.
     * @memberof GraphQLService
     * @function devDependencies
     * @returns {Record<string, string>} Object of package name and version.
     */
    get devDependencies(): DependenciesType {
        return {
            ...super.devDependencies,
            ...{
                '@types/express': '^4.17.8',
                '@types/graphql': '^14.5.0',
                nodemon: '^2.0.6',
            },
        };
    }

    /**
     * Object of the scripts.
     * @function scripts
     * @memberof GraphQLService
     * @returns {Record<string, string>} Object of the scripts.
     */
    get scripts(): Record<string, string> {
        return {
            ...super.scripts,
            ...{
                start: 'nodemon --exec ts-node ./src/index.ts',
            },
        };
    }

    /**
     * Make the main `index.ts` file content.
     * @function makeMainIndexFileContent
     * @returns {string} `index.ts` file content.
     */
    makeMainIndexFileContent(): string {
        return super.makeMainIndexFileContent() + INDEX_TEMPLATE;
    }

    /**
     * Event listener for after an initialization.
     * @function postInit
     * @memberof GraphQLService
     * @returns {void}
     */
    postInit(): void {
        super.postInit();
    }
}
