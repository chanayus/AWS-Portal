import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../../components/main/Breadcrumb";
import Loading from "../../../components/main/loading";
import ResourceTable from "../../../components/resource/ResourceTable";
import { useFetch } from "../../../lib/useFetch";
import { useRouter } from "next/router";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]);
  const { iamName } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);

  useEffect(() => {
    setResources(data.filter((value) => value.owner === iamName));
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center">
        <Loading />
        <h1 className="ml-3">Loading</h1>
      </div>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb/>
        <div className="flex items-center mb-16">
          <div className=" w-12 h-12 rounded-md bg-gray-400 flex items-center justify-center">
            <h2 className="text-white text-2xl uppercase">{iamName ? iamName[0]  : null}</h2>
          </div>
          <h1 className="ml-3 capitalize">{iamName !== "-" ? iamName : "ไม่มีการระบุ IAM"}</h1>
        </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
            <ResourceTable resources={resources} setResources={setResources} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
};

export default SpecificResource;
