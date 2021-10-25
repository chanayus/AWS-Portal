import { UserTC, ResourceTC } from '../../models'

UserTC.addRelation(
    'resources',
    {
        resolver: () => ResourceTC.getResolver('findMany'),
        prepareArgs: {
            filter: (source) => ({ userId: source._id })
        },
        projection: { _id: 1 }
    }
)