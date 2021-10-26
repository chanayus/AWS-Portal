import { ResourceTC, ResourceMoel } from '../../models' 

export const resources = ResourceTC.getResolver('findMany').addFilterArg({
    name: 'serviceType',
    type: 'String',
    query: (rawQuery, value) => {
        const searchServiceType = `arn:aws:${value}:`
        rawQuery.resourceARN = new RegExp(searchServiceType, 'i')
    }
})