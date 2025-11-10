import logo from "../public/logo.jpg"
function App() {

  return (
    <>
      <div className="bg-black-500">
        <div>
          <img src={logo} alt="" className="relative top-2 left-2 w-[90px] h-[90px] rounded-3xl" />
        </div>
        <div>
          <h1 className="text-white font-bold font-[Vollkorn] text-8xl flex flex-col justify-center items-center text-center" >
            <span>AI POWERED </span>
            <span>BILLING SYSTEM</span>
             </h1>
          <p className="text-white mt-10 ">
            AI-powered system for automated, accurate, and secure billing management.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
