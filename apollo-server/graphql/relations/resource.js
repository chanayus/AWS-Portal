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