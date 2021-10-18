import { TableWrapper } from "../styles/styleComponents";
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
      <div className="flex justify-between items-center md:flex-col md:items-start">
        <h1>IAM Users ทั้งหมด</h1>
        <input type="text" className="h-fit p-2 shadow rounded md:w-48 md:self-end md:mt-5" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)} />
      </div>
      <TableWrapper className="mt-16">
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
