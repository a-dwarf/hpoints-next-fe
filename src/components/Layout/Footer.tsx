import Link from "next/link";

export default function Footer() {
  return (
    <div className='w-full my-20'
    style={{
      boxShadow: '0px 2px 100px 0px rgba(50,243,169,0.22)',
    }}
    >
      <div className='max-w-5xl w-full mx-auto flex items-center py-7 relative z-10'>

        <Link className="" href="/">
          <img className="w-52" src="/images/header/headerIcon.png"/>
        </Link>
      </div>
    </div>
  )
}
