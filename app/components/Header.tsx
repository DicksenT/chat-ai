import Image from "next/image";
import React from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu} from "../../redux/sidebarSlice";
import { AppDispatch, RootState } from "../../redux/store";

const Header = ()=>{
    const appDispatch = () => useDispatch<AppDispatch>()
    const sidebarActive = useSelector((state: RootState) => state.sidebar.activeMenu)
    const dispacth = appDispatch()
    return (
        <header className="flex justify-between py-4 px-3 border-b md:px-8">
            <div className="flex items-center">
                <Image src='/chatLogo.svg' alt="Site Logo" width={32} height={32}/>
                 <h1 className="font-bold ml-2">Chat AI</h1>
            </div>
            <nav>
                <button aria-label="open menu" onClick={() => dispacth(setActiveMenu())}>
                    <Image src='/menu.svg' alt="Menu Logo" width={32} height={32}/>
                </button>
            </nav>
           <Sidebar/>
        </header>
    )
}

export default Header