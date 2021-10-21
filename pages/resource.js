import { Button, CheckBox, TableWrapper } from "../styles/styleComponents";
import { chooseAllHandle, chooseHandle } from "../lib/selectHandle"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useFetch } from "../lib/useFetch";
import { useState } from "react";

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const { loading, data } = useFetch("/api/resources", setResources, true);
  
  const filterHandle = (value) => {
    if (value === "") {
      setResources(data);
    } else {
      // setResources(
      //   data.filter((item) => {
      //     return item.owner.toUpperCase().includes(value.toUpperCase());
      //   })
      // );
    }
  };

  if (loading) {
    return <h1>loading...</h1>;
  } 
  else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} >
        <h1>Resource ที่กำลังใช้งาน</h1>
        <div className="flex mt-12 md:mt-8 md:flex-col-reverse">
          <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-white-100 font-light" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)} />
          <div className="flex md:mb-3"></div>
        </div>
        <TableWrapper className="mt-5">
          <table>
            <thead className="sm:hidden">
              <tr>
                <th>
                  <CheckBox className={`${isSelectAll ? "checked" : null}`} onClick={() => chooseAllHandle(resources, setResources, isSelectAll, setIsSelectAll)}>
                    {isSelectAll ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                  </CheckBox>
                </th>
                <th>id</th>
                <th>Resource</th>
                <th>Region</th>
                <th>สร้างเมื่อ</th>
                <th>สร้างโดย</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((value, index) => {
                return (
                  <tr key={index}>
                    <td className="sm:pr-2">
                      <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, resources, setResources)}>
                        {value.isChoose ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                      </CheckBox>
                    </td>
                    <td className="hidden sm:block">
                      <div className="hidden sm:flex justify-between my-1">
                        <b>Service Name</b>
                        {value.serviceName}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>Resource Type</b>
                        {value.resourceType ? value.resourceType : "-"}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>Region</b>
                        {value.region}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>สร้างเมื่อ</b>-
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>สร้างโดย</b>
                        {value.owner ? value.owner : "-"}
                      </div>
                      <div className="hidden sm:flex justify-between my-1">
                        <b>id</b>
                        {`${value.resourceId.substring(0, 10)}${value.resourceId.length > 10 ? "..." : ""}`}
                      </div>
                    </td>
                    <td className="sm:hidden">{`${value.resourceId.substring(0, 8)}${value.resourceId.length > 8 ? "..." : ""}`}</td>
                    <td className="flex items-center sm:hidden">
                      <img className="w-9 md:w-7 md:mr-1 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                      <div className="flex flex-col">
                        <p className="text-left font-medium">{value.serviceName}</p>
                        <p className="text-left text-gray-500">{value.resourceType}</p>
                      </div>
                    </td>
                    <td className="sm:hidden">{value.region}</td>
                    <td className="sm:hidden">-</td>
                    <td className="sm:hidden">{value.owner ? value.owner : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>
        <div className="flex mt-10 justify-end">
          <button className="bg-red-500 h-12 w-40 text-white flex justify-evenly items-center">
            <FontAwesomeIcon icon="trash" size="lg" color="white" />
            ลบ Resource
          </button>
        </div>
      </motion.div>
    );
  }
};

export default Resource;
