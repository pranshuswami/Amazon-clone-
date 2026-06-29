import logo from '../assets/Amazon Clone logo.png'
const Footer = () => {
  return (
    
    <div className="text-white">
        <div onClick={()=>window.scrollTo(0,0)}
        className="bg-gray-600 mt-5 text-center py-4 cursor-pointer font-medium">Back to top</div>
        <div className="bg-gray-800 grid grid-cols- md:grid-cols-4 gap-8 px-10 py-10">
            <div className="ml-30">
                <h2 className="text-xl font-bold">Get to Know Us</h2>
                <p className="text-lg hover:underline cursor-pointer mt-2">About Amazon</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Careers</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Press Releases</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Amazon Science</p>
            </div>
            <div className="ml-15">
                <h2 className="text-xl font-bold">Connect with Us</h2>
                <p className="text-lg hover:underline cursor-pointer mt-2">Facebook</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Twitter</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Instagram</p>
            </div>
            <div className="ml-15">
                <h2 className="text-xl font-bold">Make Money with Us</h2>
                <p className="text-lg hover:underline cursor-pointer mt-2">Sell on Amazon</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Sell under Amazon Accelerator</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Protect and Build Your Brand</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Amazon Global Selling</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Supply to Amazon</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Become an Affiliate</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Fulfilment by Amazon</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Advertise Your Products</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Amazon Pay on Merchants</p>
            </div>
            <div className="ml-15 mr-30">
                <h2 className="text-xl font-bold">Let Us Help You</h2>
                <p className="text-lg hover:underline cursor-pointer mt-2">Your Account</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Returns Centre</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Recalls and Product Safety Alerts</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">100% Purchase Protection</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Amazon App Download</p>
                <p className="text-lg hover:underline cursor-pointer mt-2">Help</p>
            </div>
        </div>
        <hr className="border-gray-700 " />

        <div className="bg-gray-800 flex items-center justify-center gap-8 ">
            <img className="h-15 w-40 my-10" src={logo} />
            <button className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-800">🌐 English</button>
            <button className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-800">🇮🇳 India</button>
        </div>

        <div className="bg-gray-950 text-gray-300 px-20 py-10">
             <div className="grid grid-cols-4 gap-4 max-w-6xl ml-10">
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
                <div className="flex justify-center gap-8 text-sm">
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