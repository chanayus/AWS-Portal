import { AnimatePresence, motion } from "framer-motion";
import { CheckBox, TableWrapper } from "../../../styles/styleComponents";
import { chooseAllHandle, chooseHandle } from "../../../lib/selectHandle";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../components/main/loading";
import { useFetch } from "../../../lib/useFetch";
import { useRouter } from "next/router";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]);
  const { iamName } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);
  const [isSelectAll, setIsSelectAll] = useState(false);
  useEffect(() => {
    setResources(data.filter((value) => {
      if(iamName === "-"){
        return !value.owner
      }
      else{
        return value.owner === iamName
      }
    }));
  }, [data]);

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
        <div className="flex items-center mb-16">
          <div className=" w-12 h-12 rounded-md bg-gray-400 flex items-center justify-center">
            <h2 className="text-white text-2xl">{iamName !== "-" ? iamName.charAt(0).toUpperCase() : "?"}</h2>
          </div>
          <h1 className="ml-3 capitalize">{iamName !== "-" ? iamName : "ไม่มีการระบุ IAM"}</h1>
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
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
                            <p className="text-right">{value.resourceType ? value.resourceType : "-"}</p>
                          </div>
                          <div className="hidden sm:flex justify-between my-1">
                            <b>Region</b>
                            <p className="text-right">{value.region ? value.region : "-"}</p>
                          </div>
                          <div className="hidden sm:flex justify-between my-1">
                            <b>สร้างเมื่อ</b>
                            <p className="text-right">{value.createdAt ? value.createdAt : "-"}</p>
                          </div>
                          <div className="hidden sm:flex justify-between my-1">
                            <b>สร้างโดย</b>
                            <p className="text-right">{value.owner ? value.owner : "-"}</p>
                          </div>
                          <div className="hidden sm:flex justify-between my-1">
                            <b>id</b>
                            <p className="text-right">{`${value.resourceId.substring(0, 10)}${value.resourceId.length > 10 ? "..." : ""}`}</p>
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
};

export default SpecificResource;
