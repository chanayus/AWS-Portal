import { RelationshipTC, ResourceTC } from '../../models'

RelationshipTC.addRelation(
    'resource',
    {
        resolver: () => ResourceTC.getResolver('findOne'),
        prepareArgs: {
            filter: (source) => ({resourceARN: source.childResouresARN})
        },
        projection: { childResouresARN: 1 }
    }
)
