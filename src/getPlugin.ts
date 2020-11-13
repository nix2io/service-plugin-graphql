import { GraphQLPlugin } from '.';
import { ServicePlugin } from '@nix2/service-core';

/**
 * Return the plugin.
 * @returns {ServicePlugin} GraphQL Plugin.
 */
export default (): ServicePlugin => GraphQLPlugin;
