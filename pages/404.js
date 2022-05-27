import { useRouter } from "next/router"

const Page404 = () => {
  const router = useRouter()

  return (
    <div className="w-screen h-screen dynamic-bg flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* <h1 className="text-[20vw] md:text-[34vw] leading-[0.9]">404</h1> */}
        <div className="flex items-center">
          <h1 className="text-[19vw] md:text-[34vw] leading-[1.15]">4</h1>
          <img src="/images/logo-no-text.svg" className="w-[16vw] min-w-[160px]" alt="" />
          <h1 className="text-[19vw] md:text-[34vw] leading-[1.15]">4</h1>
        </div>
        <p className=" font-[100] text-[1.75rem]">Page Not Found</p>
        <button className="mt-6 dynamic-bg-invert dynamic-text-invert py-4 px-6 rounded" onClick={() => router.replace("/")}>
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  )
}

export default Page404
