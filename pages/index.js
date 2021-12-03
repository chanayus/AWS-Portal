import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoSparkles } from "react-icons/io5";
import Link from "next/link";
import Loading from "../components/main/loading";
import SkeletonTable from "../components/main/SkeletonTable";
import { TableWrapper } from "../styles/styleComponents";
import { getUniqueData } from "../lib/getUniqueData";
import moment from "moment";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { useFetch } from "../lib/useFetch";
import { useFormat } from "../lib/useFormat";
import { useRouter } from "next/router";

const Index = () => {
  const { loading, data: resources } = useFetch("/api/resources", () => {}, false);
  const [dataFormatted, setDataFormatted] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loading ? null : setDataFormatted(useFormat(resources));
  }, [loading]);

  const resourcesToday = dataFormatted.filter((value) => moment(value.createdAt, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")).length;
  const totalIAM = [...new Set(dataFormatted.map((value) => value.owner))].filter((value) => value).length;

  const cardlist = [
    { color: "#7fe490", url: "/resource?type=iam", title: "IAM ที่กำลังใช้ Resource", value: totalIAM, icon: "user" },
    { color: "#e07272", url: "/resource?type=region", title: "Region ที่กำลังใช้งาน", value: `${getUniqueData(dataFormatted, "region").length}`, icon: "globe-americas" },
    { color: "#e2a54a", url: "/resource", title: "Resource ที่กำลังใช้งาน", value: dataFormatted.length, icon: "server" },
    { color: "#778bf0", url: "/resource?display=table", title: "Resource ใหม่ในวันนี้", value: resourcesToday, icon: "resourceToday" },
  ];
  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-4 gap-8  xl:gap-3 lg:grid-cols-2 mt-6">
        {cardlist.map((value, index) => (
          <Link href={value.url} key={index}>
            <DataCard color={value.color} whileHover={{ y: 5 }} transition={{ duration: 0.1 }}>
              {value.icon === "resourceToday" ? <IoSparkles className="mr-4" /> : <FontAwesomeIcon icon={value.icon} size="4x" className="mr-4" />}
              <div>
                <h2>{value.title}</h2>
                <h1>{loading ? <Loading /> : value.value}</h1>
              </div>
            </DataCard>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-16 gap-10 lg:flex-col">
        <div className="flex-1">
          {loading ? (
            <SkeletonTable />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-lg">Resource ในแต่ละ Region</h2>
                <button
                  className="text-white bg-black px-3 py-2 rounded md:text-xs"
                  onClick={() => {
                    router.push({ pathname: "/resource", query: { display: "card", type: "region" } });
                  }}
                >
                  ดูทั้งหมด
                </button>
              </div>
              <TableWrapper className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>จำนวน Resource</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUniqueData(dataFormatted, "region")
                      .slice(0, 3)
                      .map((value, index) => (
                        <tr key={index}>
                          <td>{value}</td>
                          <td>{dataFormatted.filter((item) => item.region === value).length}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </TableWrapper>
            </>
          )}
        </div>
        <div className="flex-1 lg:mt-5">
          {loading ? (
            <SkeletonTable />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-lg">Resource ที่ถูกสร้างล่าสุด</h2>
                <button
                  className="text-white bg-black px-3 py-2 rounded md:text-xs"
                  onClick={() => {
                    router.push({ pathname: "/resource", query: { display: "table" } });
                  }}
                >
                  ดูทั้งหมด
                </button>
              </div>
              <TableWrapper className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Resource</th>
                      <th>สร้างเมื่อ</th>
                      <th>สร้างโดย</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataFormatted.slice(0, 3).map((value, index) => (
                      <tr key={index}>
                        <td className="flex items-center capitalize">
                          <img className="w-8 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                          <div className="flex flex-col overflow-hidden w-1/2">
                            <p className="text-left font-medium truncate">{value.serviceName}</p>
                            <p className={`text-left text-gray-500 truncate`}>{`${value.resourceType.substring(0, 25)}${value.resourceType.length > 30 ? "..." : ""}`}</p>
                          </div>
                        </td>
                        <td>{value.createdAt}</td>
                        <td>{value.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrapper>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const DataCard = styled(motion.a)`
  ${tw`flex justify-center flex-col rounded-2xl pl-5 cursor-pointer md:px-4 md:mr-0 relative overflow-hidden duration-300 shadow-lg hover:shadow-xl`}
  background: ${(props) => props.theme.subColor};
  height: 140px;
  svg {
    ${tw`absolute -bottom-4 -right-5 block xs:opacity-80 xs:-right-10 bg-red-900 p-4 rounded-2xl `}
    background: ${(props) => props.color};
    transform: rotate(-20deg);
    font-size: clamp(4.75rem, 18vw, 5.75rem);
    color: #fff;
    z-index: 1;
  }
  h2 {
    font-size: clamp(1.05rem, 1.25vw, 1.3rem);
    font-weight: 300;
    line-height: 1.1;
    color: #888;
    position: relative;
    z-index: 2;
    ${tw`md:mb-2`}
  }
  h1 {
    font-size: clamp(2.25rem, 1.25vw, 1.3rem);
    line-height: 1;
    font-weight: 600;
    position: relative;
    z-index: 2;
    ${tw`mt-2`}
    color: ${(props) => props.theme.textColor};
  }
`;
export default Index;
