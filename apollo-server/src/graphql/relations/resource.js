import { ResourceTC, UserTC } from '../../models'

ResourceTC.addRelation(
    'owner',
    {
        resolver: () => UserTC.getResolver('findById'),
        prepareArgs: {
            _id: (source) => source.userId,
        },
        projection: { userId: 1 }
    }
)

ResourceTC.addFields({
    serviceType: {
        type: 'String',
        resolve: (source) => source.resourceARN.split(':')[2],
        projection: {resourceARN: 'arn:partition:service:region:account-id:resource-type/resource-id'}
    }
})