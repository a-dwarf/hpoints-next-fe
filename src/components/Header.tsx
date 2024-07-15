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
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Wallet2Icon } from "lucide-react";
import { Dropdown, Menu } from "antd";

export const WalletSignButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div
                  className={clsx("flex items-center cursor-pointer justify-center gap-1.5  rounded-xl border border-transparent border-solid ml-20"
                    ," text-xs text-white font-bold")}
                  style={{
                    // backgroundImage: 'linear-gradient(#ffff0000, #ffff0000),linear-gradient(136deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.52))',
                    // borderImage: 'linear-gradient(136deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.52)) 2 2',
                    clipPath: 'inset(0 round 10px)',
                    backgroundOrigin: "border-box",
                    // borderRadius: '1px',
                    borderColor: 'rgba(255, 255, 255, 0.52)',
                    backgroundClip: 'content-box, border-box'
                  }}
                  >
                    <button className="flex items-center gap-2 px-3 py-2.5 " onClick={openConnectModal} type="button">
                      <img className="w-6 h-6" alt="" src="/images/header/metamask-icon.svg" />

                      Login
                    </button>
                  </div>
                );
              }
              if (chain.unsupported) {
                return (
                  <div
                  className={clsx("flex items-center cursor-pointer justify-center gap-1.5  rounded-xl border border-transparent border-solid ml-20"
                    ," text-xs text-white font-bold")}
                  style={{
                    // backgroundImage: 'linear-gradient(#ffff0000, #ffff0000),linear-gradient(136deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.52))',
                    // borderImage: 'linear-gradient(136deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.52)) 2 2',
                    clipPath: 'inset(0 round 10px)',
                    backgroundOrigin: "border-box",
                    // borderRadius: '1px',
                    borderColor: 'rgba(255, 255, 255, 0.52)',
                    backgroundClip: 'content-box, border-box'
                  }}
                  >
                         <button className="flex items-center gap-2 px-3 py-2.5 "  onClick={openChainModal} type="button">
                            <img className="w-6 h-6" alt="" src="/images/header/metamask-icon.svg" />

                            Wrong network
                          </button>
                  </div>
            
                );
              }
              return (
                <Dropdown
                menu={{items: [
            
                  {
                    key: 'provile',
                    type: 'item',
                    label: <Link href={'/user'}>Profile</Link>,
                  },

                  {
                    key: 'logout',
                    type: 'item',
                    label: <div onClick={openAccountModal} >Logout</div>,
                  }
                ]}}
                >

                  <div 
                  className={clsx("flex items-center cursor-pointer justify-center gap-1.5  px-3 py-2.5 rounded-[6px] border border-transparent border-solid ml-20"
                    ," text-xs text-white font-bold")}
                  style={{ display: 'flex', gap: 12,
                    background: 'linear-gradient( 44deg, #414141 0%, #434343 46%, #585858 100%)',

                  }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 24,
                            height: 24,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 24, height: 24 }}
                            />
                          )}
                        </div>
                      )}
                    </button>
                    <button type="button">
                      {account.displayName}
                      {/* {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''} */}
                    </button>
                  </div>
                </Dropdown>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};



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
  }, [top]);
  const handleLoginWithX = useCallback(async() => {
    await signIn('twitter')
  }, []);
  const handleLoginWithGithub = useCallback(async() => {
    await signIn('github')
  }, []);
  const session = useSession();
  // console.log('user session', session);

  const hasTwitter = useMemo(() => {
   return (session.data as any)?.token?.user?.accounts?.find((item: any) => {
      return item.provider === 'twitter'
    })
  }, [session.data]);

  const hasGithub = useMemo(() => {
    return (session.data as any)?.token?.user?.accounts?.find((item: any) => {
       return item.provider === 'github'
     })
   }, [session.data]);
  return (
    <div className={clsx("w-full relative backdrop-blur-md", showBlur ? ' backdrop-blur-md': '')} ref={scrollRef}>
      <div className=" absolute -translate-y-20">
        <img className=" w-96 h-60" src="/images/quest/questBg1.png" />
      </div>
      <div className=" max-w-5xl w-full mx-auto flex items-center py-7 relative z-10">
        <div className="navbar-start">
          <Link className="" href="/">
            <img className="w-52" src="/images/header/headerIcon.png"/>
          </Link>
        </div>
        <div className="navbar-end flex items-center gap-6 mr-6">
        <div>
          <Link className=" text-[#666666] text-lg font-semibold" href={'/reputation'}>
            Reputation
          </Link>
        </div>
          {/* <ConnectButton showBalance={false}  /> */}
          {/* <Wallet2Icon className="w-6 h-6" /> */}
          <WalletSignButton />
        {/* {session.status === 'authenticated' && !hasTwitter && <div>
          <Button variant={"ghost"}
          onClick={handleLoginWithX}
          >
            <TwitterLogoIcon className="h-6 w-6" />
          </Button>
        </div>} */}
        {/* {session.status === 'authenticated' && !hasGithub && <div>
          <Button variant={"ghost"}
          onClick={handleLoginWithGithub}
          >
            <GitHubLogoIcon className="h-6 w-6" />
          </Button>
        </div>} */}
        {/* {!(session?.status === "authenticated") ? <></> : <div onClick={() => signOut()}>logout</div>} */}
        {/* <label className="swap swap-rotate  hidden sm:flex">
          <input type="checkbox" className="theme-controller" value="synthwave" />
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label> */}
        {/* {account?.address ? <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar"
          onClick={() => {
            if(!account) {
            }
          }}
          >
            <div className="w-10 rounded-full border">
              
            </div>
          </div>
          {<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href={'/userSpace'} className="justify-between">
                My Quest
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
          </ul>}
        </div>: <></>} */}
      </div>
      </div>
    </div>
  )
}

export default Header