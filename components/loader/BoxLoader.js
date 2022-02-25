import { motion } from "framer-motion"

const BoxLoader = ({ classProps = "dynamic-text" }) => {
  const icon = {
    hidden: {
      pathLength: 0,
      opacity: 0.1,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
    },
  }
  return (
    <motion.svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      className={`${classProps} opacity-100`}
      height="5.5rem"
      width="5.5rem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10px"
        d="M448 341.37V170.61A32 32 0 00432.11 143l-152-88.46a47.94 47.94 0 00-48.24 0L79.89 143A32 32 0 0064 170.61v170.76A32 32 0 0079.89 369l152 88.46a48 48 0 0048.24 0l152-88.46A32 32 0 00448 341.37z"
      ></motion.path>
      <motion.path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10px"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        d="M69 153.99l187 110 187-110m-187 310v-200"
      ></motion.path>
    </motion.svg>
  )
}

export default BoxLoader
