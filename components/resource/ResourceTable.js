import { CheckBox, TableWrapper } from "../../styles/styleComponents";
import { chooseAllHandle, chooseHandle } from "../../lib/selectHandle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";

const ResourceTable = ({ resources, setResources }) => {
  const router = useRouter();
  const { pathname } = router;
  const isServicePage = pathname === "/resource/[serviceName]";

  const [isSelectAll, setIsSelectAll] = useState(false);
  return (
    <>
      <div className="mt-6 mb-3 flex justify-start">
        <p className="opacity-80">ผลการค้นหา {resources.length} รายการ</p>
      </div>
      <TableWrapper>
        <table>
          <thead className="sm:hidden">
            <tr>
              <th width="80px">
                <CheckBox className={`${isSelectAll ? "checked" : null}`} onClick={() => chooseAllHandle(resources, setResources, isSelectAll, setIsSelectAll)}>
                  {isSelectAll ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                </CheckBox>
              </th>
              <th className="pl-1" width="10%">
                id
              </th>
              <th width="22.5%">Resource</th>
              <th>Region</th>
              <th>สร้างเมื่อ</th>
              <th>สร้างโดย</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((value, index) => {
              return (
                <tr key={index} className={`${value.isChoose ? "selected" : null}`}>
                  <td className="sm:hidden px-0">
                    <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, resources, setResources)}>
                      {value.isChoose ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                    </CheckBox>
                  </td>
                  <td className="hidden sm:block pt-3">
                    <div className="hidden sm:flex justify-between items-center my-1 pb-1">
                      <div className="flex items-center ">
                        <img className="w-7 mr-1 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                        <div className="flex flex-col justify-center">
                          <p className="font-medium capitalize">{value.serviceName}</p>
                          <p>{value.resourceType}</p>
                        </div>
                      </div>
                      <div>
                        <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value, resources, setResources)}>
                          {value.isChoose ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                        </CheckBox>
                      </div>
                    </div>
                    <div className="hidden sm:flex justify-between my-2 pt-1">
                      <b>Region</b>
                      <p className="text-right">{value.region ? value.region : "-"}</p>
                    </div>
                    <div className="hidden sm:flex justify-between my-2">
                      <b>สร้างเมื่อ</b>
                      <p className="text-right">{value.createdAt ? value.createdAt : "-"}</p>
                    </div>
                    <div className="hidden sm:flex justify-between my-2">
                      <b>สร้างโดย</b>
                      <p className="text-right">{value.owner ? value.owner : "-"}</p>
                    </div>
                    <div className="hidden sm:flex justify-between my-2">
                      <b>id</b>
                      <p className="text-right">{`${value.resourceId.substring(0, 10)}${value.resourceId.length > 10 ? "..." : ""}`}</p>
                    </div>
                  </td>
                  <td className="sm:hidden pl-1">
                    <div className="flex justify-between items-center relative">
                      <p>{`${value.resourceId.substring(0, 10)}${value.resourceId.length > 10 ? "..." : ""}`}</p>
                      <button onClick={() => navigator.clipboard.writeText(value.resourceId)}>
                        <FontAwesomeIcon icon="clipboard" size="1x" className="text-gray-400" />{" "}
                      </button>
                    </div>
                  </td>
                  <td className="flex items-center sm:hidden">
                    <img className="w-9 md:w-7 md:mr-1 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                    <div className="flex flex-col overflow-hidden w-1/2">
                      {isServicePage ? null : <p className="text-left font-medium truncate capitalize">{value.serviceName}</p>}
                      {isServicePage && value.resourceType === "" ? <p className="text-left font-medium truncate">{value.serviceName}</p> : null}
                      <p className={`text-left ${isServicePage ? "dynamic-text" : " text-gray-500"} truncate`}>{`${value.resourceType.substring(0, 25)}${
                        value.resourceType.length > 30 ? "..." : ""
                      }`}</p>
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
    </>
  );
};


export default ResourceTable;
