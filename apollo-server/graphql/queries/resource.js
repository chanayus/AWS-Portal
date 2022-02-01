import { ResourceTC, ResourceMoel } from '../../models'
import { schemaComposer } from 'graphql-compose'

export const resources = ResourceTC.getResolver('findMany').addFilterArg({
    name: 'serviceType',
    type: 'String',
    query: (rawQuery, value) => {
        const searchServiceType = `arn:aws:${value}:`
        rawQuery.resourceARN = new RegExp(searchServiceType, 'i')
    }
}).addFilterArg({
    name: 'resourceType',
    type: 'String',
    query: (rawQuery, value) => {
        const searchResourceType = `:${value}/`
        rawQuery.resourceARN = new RegExp(searchResourceType, 'i')
    }
})