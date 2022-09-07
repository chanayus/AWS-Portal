import { FaGlobeAmericas, FaUserAlt } from "react-icons/fa"
import { IoCube, IoSparkles } from "react-icons/io5"
import { useEffect, useState } from "react"

import Image from "../components/main/Image"
import Link from "next/link"
import Loader from "../components/loader/Loader"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import SkeletonTable from "../components/loader/SkeletonTable"
import { TableWrapper } from "../styles/styleComponents"
import dayjs from "dayjs"
import { getUniqueData } from "../hooks/getUniqueData"
import { motion } from "framer-motion"
import styled from "styled-components"
import tw from "twin.macro"
import { useFetch } from "../hooks/useFetch"
import { useFormat } from "../hooks/useFormat"
import { useRouter } from "next/router"

const Index = () => {
  const { loading, data: resources, error } = useFetch("/api/resources", () => {}, false)
  const { loading: costLoading, data: cost } = useFetch("/api/get_cost", () => {}, false)
  const [dataFormatted, setDataFormatted] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const router = useRouter()

  useEffect(() => {
    loading ? null : setDataFormatted(useFormat(resources))
  }, [loading])

  useEffect(() => {
    setTotalPrice(
      cost.netResourcesCost
        ?.filter((value) => value.resourceId)
        .reduce((accumulator, object) => {
          return accumulator + object.netCost
        }, 0)
        .toFixed(4)
    )
  }, [costLoading])

  const resourcesToday = dataFormatted.filter((value) => dayjs(value.createdAt).format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")).length

  const totalIAM = [...new Set(dataFormatted.map((value) => value.owner))].filter((value) => value).length

  const cardlist = [
    {
      color: "#7fe490",
      url: "/resources?type=iam",
      title: "IAM ที่กำลังใช้ Resource",
      value: totalIAM,
      icon: <FaUserAlt className="mr-4" />,
    },
    {
      color: "#e07272",
      url: "/resources?type=region",
      title: "Region ที่กำลังใช้งาน",
      value: `${getUniqueData(dataFormatted, "region").length}`,
      icon: <FaGlobeAmericas className="mr-4" />,
    },
    {
      color: "#e2a54a",
      url: "/resources",
      title: "Resource ที่กำลังใช้งาน",
      value: dataFormatted.length,
      icon: <IoCube className="mr-4" />,
    },
    {
      color: "#778bf0",
      url: "/resources?display=table&sort=latest",
      title: "Resource ใหม่ในวันนี้",
      value: resourcesToday,
      icon: <IoSparkles className="mr-4" />,
    },
  ]
  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-4 gap-8  xl:gap-3 lg:grid-cols-2 mt-6">
        {cardlist.map((value, index) => (
          <Link href={value.url} key={index}>
            <DataCard color={value.color} whileHover={{ y: 5 }} transition={{ duration: 0.1 }}>
              {value.icon}
              <div>
                <h2>{value.title}</h2>
                <h1>{loading ? <Loader /> : value.value}</h1>
              </div>
            </DataCard>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-10 gap-10 lg:flex-col">
        <div className="flex-1">
          <Link href={"/cost"}>
            <DataCard color={"#8453bb"} whileHover={{ y: 5 }} transition={{ duration: 0.1 }}>
              <RiMoneyDollarCircleFill className="mr-4" />
              <div>
                <h2>จำนวนค่าใช้จ่าย</h2>
                <h1>
                  {costLoading ? <Loader /> : totalPrice}
                  {error && "- "}
                  {!costLoading && <span className="text-2xl opacity-70">USD</span>}
                </h1>
              </div>
            </DataCard>
          </Link>
          <div className="mt-10">
            {loading ? (
              <SkeletonTable />
            ) : (
              <>
                <div className="flex justify-between items-center ">
                  <h2 className="text-xl md:text-lg">Resource ในแต่ละ Region</h2>
                  <button
                    className="text-white bg-black px-3 py-2 rounded md:text-xs"
                    onClick={() => {
                      router.push({
                        pathname: "/resources",
                        query: { display: "card", type: "region" },
                      })
                    }}
                  >
                    ดูทั้งหมด
                  </button>
                </div>
                <TableWrapper className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  <table>
                    <thead className="non-sticky">
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
                    router.push({
                      pathname: "/resources",
                      query: { display: "table" },
                    })
                  }}
                >
                  ดูทั้งหมด
                </button>
              </div>
              <TableWrapper className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <table>
                  <thead className="sm:hidden">
                    <tr>
                      <th>Resource</th>
                      <th>สร้างเมื่อ</th>
                      <th>สร้างโดย</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataFormatted.slice(0, 3).map((value, index) => (
                      <tr key={index}>
                        <td className="flex items-center capitalize sm:hidden">
                          <Image
                            classProps="w-8 mr-2 rounded"
                            width="32px"
                            height="32px"
                            src={`/images/resourceIcon/${value.serviceName}.png`}
                            alt="service-icon"
                          />
                          <div className="flex flex-col overflow-hidden w-1/2">
                            <p className="text-left font-medium truncate">{value.serviceName}</p>
                            {value.serviceName === value.resourceType ? null : (
                              <p className={`text-left text-gray-500 truncate`}>{`${value.resourceType.substring(0, 15)}${
                                value.resourceType.length > 15 ? "..." : ""
                              }`}</p>
                            )}
                          </div>
                        </td>
                        <td className="sm:hidden">
                          {dayjs(value.createdAt).format("D/MM/YYYY H:mm") === "Invalid Date" ? "-" : dayjs(value.createdAt).format("D/MM/YYYY H:mm")}
                        </td>
                        <td className="sm:hidden">{value.owner}</td>

                        <td className="hidden sm:block pt-3 px-3 w-full">
                          <div className="flex items-center">
                            <Image
                              classProps="w-8 mr-2 rounded"
                              width="32px"
                              height="32px"
                              src={`/images/resourceIcon/${value.serviceName}.png`}
                              alt="service-icon"
                            />
                            <div className="flex flex-col overflow-hidden w-1/2">
                              <p className="text-left font-medium truncate">{value.serviceName}</p>
                              {value.serviceName === value.resourceType ? null : (
                                <p className={`text-left text-gray-500 truncate`}>{`${value.resourceType.substring(0, 15)}${
                                  value.resourceType.length > 15 ? "..." : ""
                                }`}</p>
                              )}
                            </div>
                          </div>
                          <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                            <b>Region</b>
                            <p className="text-right">{value.region ? value.region : "-"}</p>
                          </div>
                          <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                            <b>สร้างเมื่อ</b>
                            <p className="text-right">{value.createdAt ? value.createdAt : "-"}</p>
                          </div>
                          <div className="hidden sm:flex w-full justify-between my-2 pt-1">
                            <b>สร้างโดย</b>
                            <p className="text-right">{value.owner ? value.owner : "-"}</p>
                          </div>
                        </td>
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
  )
}

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
`
export default Index
