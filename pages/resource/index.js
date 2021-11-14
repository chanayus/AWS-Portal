import { useEffect, useState } from "react";

import CardSection from "../../components/resource/CardSection";
import Loading from "../../components/main/loading";
import TableSection from "../../components/resource/TableSection";
import { motion } from "framer-motion";
import { useFetch } from "../../lib/useFetch";
import { useRouter } from "next/router";

const Resource = () => {
  const router = useRouter();
  const { display, cardType } = router.query;
  const [resources, setResources] = useState([]);
  const { loading, data } = useFetch("/api/resources", setResources, true);
  const [displayType, setDisplayType] = useState("");

  useEffect(() => {
    loading ? null : setDisplayType(display)
  }, [loading])

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
        <h1>Resource ที่กำลังใช้งาน</h1>
        {displayType === "table" ? (
          <TableSection data={data} resources={resources} setResources={setResources} setDisplayType={setDisplayType}/>
        ) : (
          <CardSection data={data} setDisplayType={setDisplayType} type={cardType ? cardType : "service"}/>
        )}
      </motion.div>
    );
  }
};

export default Resource;
