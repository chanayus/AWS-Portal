import { schemaComposer } from 'graphql-compose'
import { ResourceTC, ResourceMoel, IAMUserModel, RoleUserModel, UserModel } from '../../models'
import { config, EC2, ResourceGroupsTaggingAPI } from 'aws-sdk'

// export const createResource = ResourceTC.getResolver('createOne')

const resourceInput = schemaComposer.createInputTC({
    name: 'resourceInput',
    fields: {
        resourceARN: 'String!',
        roleId: 'String'
    }
})

const userInfoInput = schemaComposer.createInputTC({
    name: 'userInfoInput',
    fields: {
        username: 'String!',
        userType: 'String!',
        principalId: 'String!'
    }
})

const createResourcesInput = schemaComposer.createInputTC({
    name: 'createResourcesInput',
    fields: {
        resources: [resourceInput],
        createdAt: 'Date!',
        userInfo: userInfoInput,
        // ownerPrincipalId: 'String!',
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
        let owner = await UserModel.findOne({ principalId: userInfo.principalId })
        // if (owner.type === 'Role'){
        //     owner = await IAMUserModel.findById(owner?.owner)
        // }
        if (!owner){
            owner = await UserModel.create({
                principalId: userInfo.principalId,
                username: userInfo.username,
                type: userInfo.userType
            })
        }

        config.update({region: 'ap-southeast-1'});

        // const resourceGroupsTagAPI = new ResourceGroupsTaggingAPI()
        // const resourceGroupsTag = await resourceGroupsTagAPI.getResources({
        //     ResourceTypeFilters: ['ec2'], TagFilters:[
        //         {Key: 'createdAt', Values: ['2022-01-18T17:17:31Z']}
        //     ]
        // }).promise()
        // console.log(resourceGroupsTag)

        const new_resources = args.records.resources
        const resources = []
        // for (const new_resource of new_resources){
        //     const resource = await ResourceMoel.create({
        //         resourceARN: new_resource.resourceARN,
        //         createdAt,
        //         userId: owner._id
        //     })
        //     resources.push(resource)
        // }

        // if (createRoleEvents.includes(eventName)){
        //     await RoleUserModel.create({
        //         username: new_resources[0].resourceARN.split('/')[3],
        //         owner: owner._id,
        //         principalId: new_resources[0].roleId
        //     })
        // }

        return resources
    }
})

const resourceARNInput = schemaComposer.createInputTC({
    name: 'resourceARNInput',
    fields: {
        resourceARN: 'String!'
    }
})

const resourceARNPayload = schemaComposer.createObjectTC({
    name: 'resourceARNPayload',
    fields: {
        resourceARN: 'String!'
    }
})

const resCb = (err, data) => {
    if (err) console.log(err, err.stack);
    else    console.log(data);
}

export const deleteEC2Resources = schemaComposer.createResolver({
    name: 'deleteEC2Resources',
    args: {
        records: [resourceARNInput]
    },
    type: [resourceARNPayload],
    resolve: async ({ args }) => {
        const resourcesARN = args.records
        for (const i of resourcesARN){
            const resourceARN = i.resourceARN
            const region = resourceARN.split(':')[3]
            config.update({ region })
            const ec2 = new EC2()
            const resouresType = resourceARN.split(':')[5].split('/')[0]
            if (resouresType === 'vpc'){
                const vpcId = (resourceARN.split(':')).pop().split('/').pop()
                ec2.deleteVpc({ VpcId: vpcId }, resCb)
            }
        }

        return args.records
    }
})