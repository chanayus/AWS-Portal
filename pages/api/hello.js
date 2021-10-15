// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json(
   [
      { 
        id: "1",
        name: 'CloudWatch' ,
        region: 'Europe (London)',
        createAt: '10/4/2021 11:09AM',
        createBy: 'IAM User 1' 
      },
      { 
        id: "2",
        name: 'CloudWatch' ,
        region: 'Europe (London)',
        createAt: '10/4/2021 11:09AM',
        createBy: 'IAM User 2' 
      },
      { 
        id: "3",
        name: 'CloudWatch' ,
        region: 'Europe (London)',
        createAt: '10/4/2021 11:09AM',
        createBy: 'IAM User 3' 
      },
      { 
        id: "4",
        name: 'CloudWatch' ,
        region: 'Europe (London)',
        createAt: '10/4/2021 11:09AM',
        createBy: 'IAM User 4' 
      },
      
   ]
  )
}
