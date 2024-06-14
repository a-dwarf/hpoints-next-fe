'use client'
import { useAppDispatch } from "@/redux/hooks";
import { useAccount } from "@/redux/hooks/accounts";
import { accountActions } from "@/redux/store/account/accountSlice";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useAccount as useWagmiAccount } from 'wagmi'
import axios from "axios";



function Header() {
  // const account = useAccount();
  const account = useWagmiAccount();

  const handleRegister = useCallback(async () => {
    const address = account.address;
    if(!address) return;
    const res = await axios.get(`/api/user/${address}`);
    const user = res.data;
    if(user?.id) {
      return;
    }
    const rs = await axios.put(`/api/user/${address}`, {
      address,
      name: address,
    });

  }, [account.address]);
  useEffect(() => {
    handleRegister();
  }, [handleRegister]);
  const scrollRef = useRef(null);
  const [top, setTop] = useState(0)
  const handleScroll = useCallback(() => {
    setTop(window.scrollY)
  }, []);
  const dispatch = useAppDispatch();
  const logout = useCallback(() => {
    dispatch(accountActions.removeAccount(account?.address || ''))
  }, [account?.address, dispatch]);
  // const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);

    }
  }, [handleScroll]);
  const showBlur = useMemo(() => {
    return top > 50 ;
  }, [top])
  return (
    <div className={clsx("navbar w-full shadow-md", showBlur ? ' backdrop-blur-md': ' bg-base-100')} ref={scrollRef}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h1" /></svg>
          </div>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">Hpoints</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
  
      </div>
      <div className="navbar-end flex items-center gap-6 mr-6">
        <div className="flex items-center justify-center gap-4">
          <ConnectButton showBalance={false}  />
          {/* <div className=" btn rounded-xl cursor-pointer ">Sign Up</div> */}
        </div>
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="synthwave" />
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label>
        {account?.address ? <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar"
          onClick={() => {
            if(!account) {
              // navigate('/login')
            }
          }}
          >
            <div className="w-10 rounded-full border">
              
            </div>
          </div>
          {<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href={'/userSpace'} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><Link href={'/mySpace'}>My Space</Link></li>
            {/* <li onClick={logout}><a>Logout</a></li> */}
          </ul>}
        </div>: <></>}
      </div>
    </div>
  )
}

export default Header