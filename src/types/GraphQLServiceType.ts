/*
 * File: GraphQLServiceType.ts
 * Created: 11/03/2020 13:26:00
 * ----
 * Copyright: 2020 Nix² Technologies
 * Author: Max Koon (maxk@nix2.io)
 */

import { ServiceType } from '@nix2/service-core';

export default interface GraphQLServiceContextType extends ServiceType {
    type: 'graphql';
}
