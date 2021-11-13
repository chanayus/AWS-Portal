import { useEffect, useState } from "react";

import Loading from "../components/main/loading";
import { TableWrapper } from "../styles/styleComponents";
import { motion } from "framer-motion";
import { useFetch } from "../lib/useFetch";

const IamUser = () => {
  const { loading, data } = useFetch("/api/resources", () => {}, true);
  const [iamUsers, setIamUsers] = useState([]);
  useEffect(() => {
    loading ? null : setIamUsers([...new Set(data.map((value) => value.owner))].filter((value) => value));
  }, [loading]);
  if (loading) {
    return (
      <div className="flex items-center">
        <Loading />
        <h1 className="ml-3">loading</h1>
      </div>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <h1>IAM Users ทั้งหมด</h1>
        <div className="flex mt-12 md:mt-8 md:flex-col-reverse">
          <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-white-100 font-light" placeholder="ค้นหาชื่อ resource" onChange={() => {}} />
          <div className="flex md:mb-3">{/* <Button className="py-1 px-2 mx-1 md:ml-0 font-light">เรียงโดย</Button> */}</div>
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
              {iamUsers.map((iamName, index) => {
                const totalResource = data.filter((value) => value.owner === iamName)
                const totalRegion = [...new Set(totalResource.map((value) => value.region))].length
                return (
                  <tr key={index}>
                    <td className="hidden sm:block">
                      <div className="hidden sm:flex justify-between">
                        <b>Username</b>
                        {iamName}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>จำนวน Resource ที่กำลังใช้</b>
                        {totalResource.length}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>จำนวน Region ที่กำลังใช้</b>
                        {totalRegion}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>ค่าใช้จ่ายโดยรวม</b>
                        0
                      </div>
                    </td>
                    <td className="sm:hidden">{iamName}</td>
                    <td className="sm:hidden">{totalResource.length}</td>
                    <td className="sm:hidden">{totalRegion}</td>
                    <td className="sm:hidden">0</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>
      </motion.div>
    );
  }
};

export default IamUser;
