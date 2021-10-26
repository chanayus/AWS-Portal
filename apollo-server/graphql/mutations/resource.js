import { schemaComposer } from 'graphql-compose'
import { ResourceTC, ResourceMoel, IAMUserModel, RoleUserModel } from '../../models'

// export const createResource = ResourceTC.getResolver('createOne')

const resourceInput = schemaComposer.createInputTC({
    name: 'resourceInput',
    fields: {
        resourceARN: 'String!',
        principalId: 'String'
    }
})

const userInfoInput = schemaComposer.createInputTC({
    name: 'userInfoInput',
    fields: {
        username: 'String!',
        userType: 'String!'
    }
})

const createResourcesInput = schemaComposer.createInputTC({
    name: 'createResourcesInput',
    fields: {
        resources: [resourceInput],
        createdAt: 'Date!',
        userInfo: userInfoInput,
        eventName: 'String!'
    }
})

const createRoleEvents = ['CreateServiceLinkedRole']

export const createResources = schemaComposer.createResolver({
    name: 'createResources',
    args: {
        records: createResourcesInput
    },
    type: [ResourceTC],
    resolve: async ({ args }) => {
        const { userInfo, createdAt, eventName } = args.records
        let owner
        if (userInfo.userType === 'IAMUser')
            owner = await IAMUserModel.findOne({ username: userInfo.username })
        else{
            const roleUser = await RoleUserModel.findOne({ username: userInfo.username })
            owner = await IAMUserModel.findById(roleUser.owner)
        }

        const new_resources = args.records.resources
        const resources = []
        for (const new_resource of new_resources){
            const resource = await ResourceMoel.create({
                resourceARN: new_resource.resourceARN,
                createdAt,
                userId: owner._id
            })
            resources.push(resource)
        }

        if (createRoleEvents.includes(eventName)){
            await RoleUserModel.create({
                username: new_resources[0].resourceARN.split('/')[3],
                owner: owner._id,
                principalId: new_resources[0].principalId
            })
        }

        return resources
    }
})