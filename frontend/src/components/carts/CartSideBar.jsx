import { FiTrash2 } from "react-icons/fi";

const CartSidebar = (product) => {
    return (
        <div className="h-full overflow-y-auto bg-white shadow-md p-4">
            <div className="overflow-y-hidden">
                <div className=" flex flex-col gap-1 items-center ">
                    <h2>Subtotal:</h2>
                    <h2>₹2000</h2>
                </div>

                <div className="">
                    <h2 className="text-green-400">Part of your order qualifies for FREE Delivery. <span classname="text-gray-500">Select this option at checkout.</span></h2>
                    <h2 className="text-blue-500 hover-underline">Details</h2>
                </div>

                <button classname="border border-black px-5 py-1">Go to Cart</button>

                <div className="">
                    <img src="https://i.pinimg.com/736x/5a/b0/01/5ab0012b87469bb0b81aa15389bb4260.jpg" />
                    <h2>₹149000</h2>
                    <div className="flex items-center border-2 border-yellow-400">
                        <h2><FiTrash2 className="text-xl" /></h2>
                        <h2>1</h2>
                        <h2>+</h2>
                    </div>
                </div>

                <div className="">
                    <img src="https://i.pinimg.com/1200x/a2/bf/f2/a2bff20afa780f482eeb139f270ff0c6.jpg" />
                    <h2>₹139000</h2>
                    <div className="flex items-center border-2 border-yellow-400">
                        <h2><FiTrash2 className="text-xl" /></h2>
                        <h2>1</h2>
                        <h2>+</h2>
                    </div>
                </div>

                <div className="">
                    <img src="https://i.pinimg.com/736x/d8/ef/34/d8ef34b70ebdaaa7be4692c9283c08f0.jpg" />
                    <h2>₹89000</h2>
                    <div className="flex items-center border-2 border-yellow-400">
                        <h2><FiTrash2 className="text-xl" /></h2>
                        <h2>1</h2>
                        <h2>+</h2>
                    </div>
                </div>

                <div className="">
                    <img src="https://i.pinimg.com/1200x/b5/43/3d/b5433de8d3c2eb8caad4eeb640a6768c.jpg" />
                    <h2>₹189000</h2>
                    <div className="flex items-center border-2 border-yellow-400">
                        <h2><FiTrash2 className="text-xl" /></h2>
                        <h2>1</h2>
                        <h2>+</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;