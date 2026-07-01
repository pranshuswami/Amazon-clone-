import logo from '../assets/Amazon Clone logo.png'
const Footer = () => {
  return (
    
    <div className="text-white">
        <div onClick={()=>window.scrollTo(0,0)}
        className="bg-gray-600 mt-5 text-center py-4 cursor-pointer font-medium">Back to top</div>
        <div className="bg-gray-800 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 px-5 md:px-10 py-10">
            <div className="ml-0 gap-4">
                <h2 className="text-xl font-bold mb-2">Get to Know Us</h2>
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">About Amazon</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Careers</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Press Releases</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Amazon Science</a>
            </div>
            <div className="ml-0 gap-4">
                <h2 className="text-xl font-bold mb-2">Connect with Us</h2>
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Facebook</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Twitter</a><br />
                <a href='https://www.instagram.com/amazondotin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Instagram</a>
            </div>
            <div className="ml-0 gap-4">
                <h2 className="text-xl font-bold mb-2">Make Money with Us</h2>
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Sell on Amazon</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Sell under Amazon Accelerator</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Protect and Build Your Brand</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Amazon Global Selling</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Supply to Amazon</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Become an Affiliate</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Fulfilment by Amazon</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Advertise Your Products</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Amazon Pay on Merchants</a>
            </div>
            <div className="ml-0 mr-0 gap-4">
                <h2 className="text-xl font-bold mb-2">Let Us Help You</h2>
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Your Account</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Returns Centre</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Recalls and Product Safety Alerts</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">100% Purchase Protection</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Amazon App Download</a><br />
                <a className="text-sm md:text-lg hover:underline cursor-pointer mt-2">Help</a>
            </div>
        </div>
        <hr className="border-gray-700 " />

        <div className="bg-gray-800 flex flex-row items-center justify-center gap-5 md:gap-8 ">
            <img className="h-14 w-36 object-contain my-5" src={logo} />
            <button className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-800">🌐 English</button>
            <button className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-800 ">🇮🇳 India</button>
        </div>

        <div className="bg-gray-950 text-gray-300 px-5 md:px-20 py-10">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <div className="text-sm ">
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">AbeBooks</h3>
                    <p className="text-gray-400 font-medium mb-3">Books, art<br />& collectibles</p>
                    </div>
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">Shopbop</h3>
                    <p className="text-gray-400 font-medium ">Designer<br />Fashion Brands</p>
                    </div>
                </div>
                <div className="text-sm ">
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">Amazon Web Services</h3>
                    <p className="text-gray-400 font-medium mb-3">Scalable Cloud<br />Computing Services</p>
                    </div>
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">Amazon Business</h3>
                    <p className="text-gray-400 font-medium ">Everything For<br />Your Business</p>
                    </div>
                </div>
                <div className="text-sm ">
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">Audible</h3>
                    <p className="text-gray-400 font-medium mb-3">Download<br />Audio Books</p>
                    </div>
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">Amazon Music</h3>
                    <p className="text-gray-400 font-medium ">Stream millions of<br />songs</p>
                    </div>
                </div>
                <div className="text-sm ">
                    <div className="hover:underline cursor-pointer">
                    <h3 className="text-white font-semibold">IMDb</h3>
                    <p className="text-gray-400 font-medium mb-3">Movies, TV<br />& Celebrities</p>
                    </div>                    
                </div>
             </div>
            <div className="text-center mt-16 text-gray-300">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm">
                  <p className="hover:underline cursor-pointer">Conditions of Use & Sale</p>
                  <p className="hover:underline cursor-pointer">Privacy Notice</p>
                  <p className="hover:underline cursor-pointer">Interest-Based Ads</p>
                </div>
                <p className="">© 1996-2026, Amazon.com, Inc. or its affiliates</p>
            </div>
        </div>
    </div>
  )
}

export default Footer