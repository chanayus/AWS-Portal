import { Button, TableWrapper } from "../styles/styleComponents";

import fetch from "isomorphic-unfetch";
import { useState } from "react";

export const getStaticProps = async () => {
  // const res = await fetch("http://localhost:3000/api/hello");
  // const data = await res.json();
  return {
    props: {
      iamData: [
        {
          id: "1",
          username: "IAM-01",
          usingResource: 0,
          usingRegion: 0,
          expenses: 0,
        },
        {
          id: "2",
          username: "IAM-02",
          usingResource: 0,
          usingRegion: 0,
          expenses: 0,
        },
        {
          id: "3",
          username: "IAM-03",
          usingResource: 0,
          usingRegion: 0,
          expenses: 0,
        },
        {
          id: "4",
          username: "IAM-04",
          usingResource: 0,
          usingRegion: 0,
          expenses: 0,
        },
      ],
    },
  };
};

const IamUser = ({ iamData }) => {
  const [iamUsers, setIamUsers] = useState(iamData);
  const filterHandle = (value) => {
    if (value === "") {
        setIamUsers(iamData);
    } else {
        setIamUsers(
        iamData.filter((item) => {
          return item.username.toUpperCase().includes(value.toUpperCase());
        })
      );
    }
  };
  return (
    <>
      <h1>IAM Users ทั้งหมด</h1>
      <div className="flex mt-12 md:mt-8 md:flex-col-reverse">
        <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-white-100 font-light" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)}/>
        <div className="flex md:mb-3">
          <Button className="py-1 px-2 mx-1 md:ml-0 font-light">เรียงโดย</Button>
        </div>
      </div>
      <TableWrapper className="mt-5">
        <table>
          <thead className="sm:hidden">
            <tr>
              <th>Username</th>
              <th>จำนวน Resource ที่กำลังใช้</th>
              <th>จำนวน Region ที่กำลังใช้</th>
              <th>ค่าใช้จ่ายโดยรวม</th>
            </tr>
          </thead>
          <tbody>
            {iamUsers.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="hidden sm:block">
                    <div className="hidden sm:flex justify-between">
                      <b>Username</b>
                      {value.username}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>จำนวน Resource ที่กำลังใช้</b>
                      {value.usingResource}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>จำนวน Region ที่กำลังใช้</b>
                      {value.usingRegion}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>ค่าใช้จ่ายโดยรวม</b>
                      {value.expenses}
                    </div>
                  </td>
                  <td className="sm:hidden">{value.username}</td>
                  <td className="sm:hidden">{value.usingResource}</td>
                  <td className="sm:hidden">{value.usingRegion}</td>
                  <td className="sm:hidden">{value.expenses}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default IamUser;
