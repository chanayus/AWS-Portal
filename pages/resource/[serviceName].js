import { AnimatePresence, motion } from "framer-motion";
import { CheckBox, TableWrapper } from "../../styles/styleComponents";
import { chooseAllHandle, chooseHandle } from "../../lib/selectHandle";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image'
import Loading from "../../components/main/loading";
import SelectInput from "../../components/input/SelectInput";
import { useFetch } from "../../lib/useFetch";
import { useRouter } from "next/router";

// import { selectFilterHandle } from "../../lib/useFilter"


const SpecificResource =  () =>{
    const router = useRouter()
    const [resources, setResources] = useState([]);
    const { serviceName } = router.query
    const { loading, data } = useFetch("/api/resources", setResources, true);
    const [isSelectAll, setIsSelectAll] = useState(false);
    useEffect(() =>{
        setResources(data.filter((value) => value.serviceName === serviceName))
    },[data])

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
              <div className="flex items-center">
                <Image className="rounded" src={`/images/resourceIcon/${serviceName}.png`} alt="service-Img"width={50} height={50}/>
                <h1 className="ml-3 capitalize">{serviceName}</h1>
              </div>
              <AnimatePresence exitBeforeEnter>
                <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
                  <div className="flex mt-12 md:mt-8 md:flex-col-reverse justify-between">
                    {/* <div className="flex">
                      <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-trasparent font-light" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)} />
                      <div className="flex xl:hidden gap-4 ml-4">
                        <SelectInput title="Resource" dataSelect={getUniqueData(data, "serviceName")} data={filterData} setData={setFilterData} dataKey={"resource"} resourceImg={true} />
                        <SelectInput title="Region" dataSelect={getUniqueData(data, "region")} data={filterData} setData={setFilterData} dataKey={"region"} resourceImg={false} />
                      </div>
                    </div>
                    <div className="flex md:mb-3">
                      <button className="w-9 h-9 bg-white border-4 border-blue-600 shadow" onClick={() => setDisplayType("table")}>
                        <FontAwesomeIcon icon="list" size="1x" color="blue" />
                      </button>
                      <button className="w-9 h-9 bg-white ml-3 shadow" onClick={() => setDisplayType("card")}>
                        <FontAwesomeIcon icon="th" size="1x" color="black" />
                      </button>
                    </div> */}
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
                              <td className="sm:pr-2 xs:pl-2">
                                <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, resources, setResources)}>
                                  {value.isChoose ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                                </CheckBox>
                              </td>
                              <td className="hidden sm:block xs:pl-0">
                                <div className="hidden sm:flex justify-between items-center my-1">
                                  <b>Service Name</b>
                                  <div className="flex items-center">
                                    <p>{value.serviceName}</p>
                                    <img className="w-6 ml-1 rounded 2xs:hidden" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                                  </div>
                                </div>
                                <div className="hidden sm:flex justify-between my-1">
                                  <b>Resource Type</b>
                                  {value.resourceType ? value.resourceType : "-"}
                                </div>
                                <div className="hidden sm:flex justify-between my-1">
                                  <b>Region</b>
                                  {value.region ? value.region : "-"}
                                </div>
                                <div className="hidden sm:flex justify-between my-1">
                                  <b>สร้างเมื่อ</b>
                                  {value.createdAt ? value.createdAt : "-"}
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
                              <td className="sm:hidden">
                                <div className="flex justify-between items-center">
                                  {`${value.resourceId.substring(0, 8)}${value.resourceId.length > 8 ? "..." : ""}`}
                                  <button onClick={() => navigator.clipboard.writeText(value.resourceId)}>
                                    <FontAwesomeIcon icon="clipboard" size="1x" className="text-gray-400" />{" "}
                                  </button>
                                </div>
                              </td>
                              <td className="flex items-center sm:hidden">
                                <img className="w-9 md:w-7 md:mr-1 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                                <div className="flex flex-col overflow-hidden">
                                  <p className="text-left font-medium truncate">{value.serviceName}</p>
                                  <p className="text-left text-gray-500">{value.resourceType}</p>
                                </div>
                              </td>
                              <td className="sm:hidden">{value.region}</td>
                              <td className="sm:hidden">{value.createdAt ? value.createdAt : "-"}</td>
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
              </AnimatePresence>
          </motion.div>
        );
      }
}

export default SpecificResource;