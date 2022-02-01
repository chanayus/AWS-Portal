import { ResourceTC, UserTC, RelationshipTC, RelationshipMoel, tagTC, UserModel, ResourceMoel } from '../../models'
import moment from 'moment' 

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

ResourceTC.addRelation(
    'children',
    {
        resolver: () => RelationshipTC.getResolver('findMany'),
        prepareArgs: {
            filter: (source) => {
                return {
                    type: 'parent',
                    resouresARN: source.resourceARN
                }
            }
        },
        projection: { resourceARN: 1 }
    }
)

ResourceTC.addFields({
    serviceType: {
        type: 'String',
        resolve: (source) => source.resourceARN.split(':')[2],
        projection: {resourceARN: 'arn:partition:service:region:account-id:resource-type/resource-id'}
    },
    resourceType: {
        type: 'String',
        resolve: (source) => source.resourceARN.split(':')[5].split('/')[0],
        projection: {resourceARN: 'arn:partition:service:region:account-id:resource-type/resource-id'}
    },
    Tags: {
        type: [tagTC.getType()],
        resolve: async (source) => {
            const resource = await ResourceMoel.findById(source._id)
            const owner = await UserModel.findById(resource.userId)

            return [
                {
                    Key: "owner",
                    Value: owner.username
                },
                {
                    Key: "PrincipalId",
                    Value: owner.principalId
                },
                {
                    Key: "createdAt",
                    Value: moment.utc(resource.createdAt).format('YYYY-MM-DD[T]HH:mm:ss')+'Z'
                },
            ]
        }
    }
})