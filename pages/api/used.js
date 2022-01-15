// export default function handler(res) {
//   res.status(200).json({
//     usedResources: [
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:vpc/vpc-0cb9b356304a0d0bd",
//         Tags: [
//           {
//             Key: "owner",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//           {
//             Key: "Name",
//             Value: "resource-project-vpc",
//           },
//         ],
//         resourceId: "vpc-0cb9b356304a0d0bd",
//         resourceType: "vpc",
//         children: [
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:subnet/subnet-0576300afce8638ea",
//             Tags: [
//               {
//                 Key: "owner",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "rep-public-subnet",
//               },
//             ],
//             resourceId: "subnet-0576300afce8638ea",
//             resourceType: "subnet",
//             children: [
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:instance/i-0ba9cddf2e1535830",
//                 Tags: [
//                   {
//                     Key: "owner",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                   {
//                     Key: "Name",
//                     Value: "mongodb",
//                   },
//                 ],
//                 resourceId: "i-0ba9cddf2e1535830",
//                 resourceType: "instance",
//                 associations: [
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-033ffa1c5fb5a2729",
//                     Tags: [
//                       {
//                         Key: "owner",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "sg-033ffa1c5fb5a2729",
//                     resourceType: "security-group",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-interface/eni-02101ff027081db02",
//                     Tags: [
//                       {
//                         Key: "owner",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                       {
//                         Key: "Name",
//                         Value: "mongodb",
//                       },
//                     ],
//                     resourceId: "eni-02101ff027081db02",
//                     resourceType: "network-interface",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:volume/vol-09b450e9bb0cfa25a",
//                     Tags: [
//                       {
//                         Key: "owner",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                       {
//                         Key: "Name",
//                         Value: "mongodb",
//                       },
//                     ],
//                     resourceId: "vol-09b450e9bb0cfa25a",
//                     resourceType: "volume",
//                   },
//                 ],
//               },
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:instance/i-01d05fdb4fc2d94ef",
//                 Tags: [
//                   {
//                     Key: "cie2021",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "createdAt",
//                     Value: "2021-12-10T17:04:35Z",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                 ],
//                 resourceId: "i-01d05fdb4fc2d94ef",
//                 resourceType: "instance",
//                 associations: [
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-0e1bcc3c67d92a9c1",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T17:04:34Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "sg-0e1bcc3c67d92a9c1",
//                     resourceType: "security-group",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-interface/eni-06110b8f131343a37",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T17:04:35Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "eni-06110b8f131343a37",
//                     resourceType: "network-interface",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:volume/vol-04866e15eab799d5f",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T17:04:35Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "vol-04866e15eab799d5f",
//                     resourceType: "volume",
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:internet-gateway/igw-06d1968eb96669ce4",
//             Tags: [
//               {
//                 Key: "owner",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "rep-igw",
//               },
//             ],
//             resourceId: "igw-06d1968eb96669ce4",
//             resourceType: "internet-gateway",
//           },
//         ],
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:vpc/vpc-0cf2e6b350a7a883f",
//         Tags: [
//           {
//             Key: "cie2021",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-12-10T09:11:27Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//           {
//             Key: "Name",
//             Value: "resource-vpc1",
//           },
//         ],
//         resourceId: "vpc-0cf2e6b350a7a883f",
//         resourceType: "vpc",
//         children: [
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:subnet/subnet-0d0c35a4328ab139b",
//             Tags: [
//               {
//                 Key: "cie2021",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "createdAt",
//                 Value: "2021-12-10T09:12:05Z",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "vpc1-pub-1",
//               },
//             ],
//             resourceId: "subnet-0d0c35a4328ab139b",
//             resourceType: "subnet",
//             children: [
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:instance/i-0066f3917d632409a",
//                 Tags: [
//                   {
//                     Key: "cie2021",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "createdAt",
//                     Value: "2021-12-10T09:35:16Z",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                 ],
//                 resourceId: "i-0066f3917d632409a",
//                 resourceType: "instance",
//                 associations: [
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-0111ff4bacfb156e4",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T09:35:14Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "sg-0111ff4bacfb156e4",
//                     resourceType: "security-group",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-interface/eni-0e4ac505ebafa07b6",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T09:35:16Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "eni-0e4ac505ebafa07b6",
//                     resourceType: "network-interface",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:volume/vol-0c67fa98289699fae",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T09:35:16Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "vol-0c67fa98289699fae",
//                     resourceType: "volume",
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:subnet/subnet-042b701ea911b7bc6",
//             Tags: [
//               {
//                 Key: "cie2021",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "createdAt",
//                 Value: "2021-12-10T09:12:35Z",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "vpc1-pri-1",
//               },
//             ],
//             resourceId: "subnet-042b701ea911b7bc6",
//             resourceType: "subnet",
//             children: [
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:instance/i-0624586046acee42a",
//                 Tags: [
//                   {
//                     Key: "cie2021",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "createdAt",
//                     Value: "2021-12-11T14:06:46Z",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                 ],
//                 resourceId: "i-0624586046acee42a",
//                 resourceType: "instance",
//                 associations: [
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-0111ff4bacfb156e4",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-10T09:35:14Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "sg-0111ff4bacfb156e4",
//                     resourceType: "security-group",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-interface/eni-0e2419759bb9ad6c6",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-11T14:06:46Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "eni-0e2419759bb9ad6c6",
//                     resourceType: "network-interface",
//                   },
//                   {
//                     ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:volume/vol-08455c0658218f227",
//                     Tags: [
//                       {
//                         Key: "cie2021",
//                         Value: "resource-project2021",
//                       },
//                       {
//                         Key: "createdAt",
//                         Value: "2021-12-11T14:06:46Z",
//                       },
//                       {
//                         Key: "PrincipalId",
//                         Value: "AIDAWOWXYQD2NMB3AT7MV",
//                       },
//                     ],
//                     resourceId: "vol-08455c0658218f227",
//                     resourceType: "volume",
//                   },
//                 ],
//               },
//             ],
//             associations: [
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-acl/acl-0b0c37f3da142935a",
//                 Tags: [
//                   {
//                     Key: "cie2021",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "createdAt",
//                     Value: "2021-12-11T15:56:17Z",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                   {
//                     Key: "Name",
//                     Value: "test1",
//                   },
//                 ],
//                 resourceId: "acl-0b0c37f3da142935a",
//                 resourceType: "network-acl",
//               },
//             ],
//           },
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:internet-gateway/igw-02d1304a575a74201",
//             Tags: [
//               {
//                 Key: "cie2021",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "createdAt",
//                 Value: "2021-12-10T09:14:07Z",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "vpc1-igw",
//               },
//             ],
//             resourceId: "igw-02d1304a575a74201",
//             resourceType: "internet-gateway",
//           },
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:route-table/rtb-0d65173092ab5dd33",
//             Tags: [
//               {
//                 Key: "cie2021",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "createdAt",
//                 Value: "2021-12-11T14:03:20Z",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "private-vpc1-route",
//               },
//             ],
//             resourceId: "rtb-0d65173092ab5dd33",
//             resourceType: "route-table",
//           },
//         ],
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:vpc/vpc-04eaa3d7650cc9486",
//         Tags: [
//           {
//             Key: "cie2021",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-12-10T09:26:31Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//           {
//             Key: "Name",
//             Value: "resource-vpc2",
//           },
//         ],
//         resourceId: "vpc-04eaa3d7650cc9486",
//         resourceType: "vpc",
//         children: [
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:subnet/subnet-020dc86c11df5a132",
//             Tags: [
//               {
//                 Key: "cie2021",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "createdAt",
//                 Value: "2021-12-11T18:48:50Z",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "vpc2-pub-2",
//               },
//             ],
//             resourceId: "subnet-020dc86c11df5a132",
//             resourceType: "subnet",
//             associations: [
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-acl/acl-07f6d75ffe39cf558",
//                 Tags: [
//                   {
//                     Key: "cie2021",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "createdAt",
//                     Value: "2021-12-11T18:50:14Z",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                   {
//                     Key: "Name",
//                     Value: "vpc2-pub",
//                   },
//                 ],
//                 resourceId: "acl-07f6d75ffe39cf558",
//                 resourceType: "network-acl",
//               },
//             ],
//           },
//           {
//             ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:subnet/subnet-0788d2fe7ecf2eebc",
//             Tags: [
//               {
//                 Key: "cie2021",
//                 Value: "resource-project2021",
//               },
//               {
//                 Key: "createdAt",
//                 Value: "2021-12-11T18:47:27Z",
//               },
//               {
//                 Key: "PrincipalId",
//                 Value: "AIDAWOWXYQD2NMB3AT7MV",
//               },
//               {
//                 Key: "Name",
//                 Value: "vpc2-pub-1",
//               },
//             ],
//             resourceId: "subnet-0788d2fe7ecf2eebc",
//             resourceType: "subnet",
//             associations: [
//               {
//                 ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-acl/acl-07f6d75ffe39cf558",
//                 Tags: [
//                   {
//                     Key: "cie2021",
//                     Value: "resource-project2021",
//                   },
//                   {
//                     Key: "createdAt",
//                     Value: "2021-12-11T18:50:14Z",
//                   },
//                   {
//                     Key: "PrincipalId",
//                     Value: "AIDAWOWXYQD2NMB3AT7MV",
//                   },
//                   {
//                     Key: "Name",
//                     Value: "vpc2-pub",
//                   },
//                 ],
//                 resourceId: "acl-07f6d75ffe39cf558",
//                 resourceType: "network-acl",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     unusedResources: [
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:image/ami-0b042e2bfc13c1897",
//         Tags: [
//           {
//             Key: "cie2021",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-12-10T16:55:34Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "ami-0b042e2bfc13c1897",
//         resourceType: "image",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:image/ami-04449b92730b1628b",
//         Tags: [
//           {
//             Key: "owner",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-11-07T10:51:23Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "ami-04449b92730b1628b",
//         resourceType: "image",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:key-pair/key-0d7c1bf580d9f06f4",
//         Tags: [
//           {
//             Key: "cie2021",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-12-10T09:35:05Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "key-0d7c1bf580d9f06f4",
//         resourceType: "key-pair",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:key-pair/key-03a30ba05def8c252",
//         Tags: [
//           {
//             Key: "cie2021",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-12-10T09:34:54Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "key-03a30ba05def8c252",
//         resourceType: "key-pair",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-0ca8cb5bfb22e49b1",
//         Tags: [
//           {
//             Key: "owner",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-11-07T10:55:34Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "sg-0ca8cb5bfb22e49b1",
//         resourceType: "security-group",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-0d2f89fb4725ebb8c",
//         Tags: [
//           {
//             Key: "owner",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-11-07T10:02:24Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "sg-0d2f89fb4725ebb8c",
//         resourceType: "security-group",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:security-group/sg-088c4d03acb69834e",
//         Tags: [
//           {
//             Key: "owner",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//         ],
//         resourceId: "sg-088c4d03acb69834e",
//         resourceType: "security-group",
//       },
//       {
//         ResourceARN: "arn:aws:ec2:ap-southeast-1:443907866868:network-acl/acl-06e134e11f7035478",
//         Tags: [
//           {
//             Key: "cie2021",
//             Value: "resource-project2021",
//           },
//           {
//             Key: "createdAt",
//             Value: "2021-12-11T18:48:08Z",
//           },
//           {
//             Key: "PrincipalId",
//             Value: "AIDAWOWXYQD2NMB3AT7MV",
//           },
//           {
//             Key: "Name",
//             Value: "test2",
//           },
//         ],
//         resourceId: "acl-06e134e11f7035478",
//         resourceType: "network-acl",
//       },
//     ],
//   });
// }
