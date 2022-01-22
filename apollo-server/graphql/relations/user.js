import { UserTC, ResourceTC } from '../../models'
import { schemaComposer, toInputObjectType  } from 'graphql-compose'

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

const findResourcesResolver = ResourceTC.getResolver('findMany')

UserTC.addFields({
    res: () => ({
        type: findResourcesResolver,
        args: findResourcesResolver.getArgs(),
        resolve: (source, args, context, info) => {
            const newArgs = {...args, filter: {
                ...args.filter, userId: source._id
            }}
            console.log(newArgs)
            return findResourcesResolver.resolve({
                source, newArgs, context, info
            })
        },
        projection: { userId: 1 }
    })
})